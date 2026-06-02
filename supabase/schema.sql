-- ============================================================
-- ZOPTAVI DATABASE SCHEMA
-- Paste this entire file into Supabase SQL Editor > Run
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- Users (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT,
  full_name     TEXT,
  avatar_url    TEXT,
  phone         TEXT,
  role          TEXT DEFAULT 'buyer' CHECK (role IN ('buyer','seller','admin')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Addresses
CREATE TABLE IF NOT EXISTS public.addresses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  label         TEXT DEFAULT 'Home',
  full_name     TEXT NOT NULL,
  phone         TEXT NOT NULL,
  line1         TEXT NOT NULL,
  line2         TEXT,
  city          TEXT NOT NULL,
  state         TEXT NOT NULL,
  pincode       TEXT NOT NULL,
  is_default    BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  image_url     TEXT,
  parent_id     UUID REFERENCES public.categories(id),
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Sellers
CREATE TABLE IF NOT EXISTS public.sellers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  store_name    TEXT NOT NULL,
  store_logo    TEXT,
  description   TEXT,
  is_verified   BOOLEAN DEFAULT FALSE,
  rating        NUMERIC(3,2) DEFAULT 0,
  total_sales   INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS public.products (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id     UUID REFERENCES public.sellers(id) ON DELETE CASCADE,
  category_id   UUID REFERENCES public.categories(id),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  price         NUMERIC(10,2) NOT NULL,
  mrp           NUMERIC(10,2),
  images        TEXT[] DEFAULT '{}',
  stock         INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT TRUE,
  is_featured   BOOLEAN DEFAULT FALSE,
  tags          TEXT[] DEFAULT '{}',
  attributes    JSONB DEFAULT '{}',
  rating        NUMERIC(3,2) DEFAULT 0,
  review_count  INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Wishlist
CREATE TABLE IF NOT EXISTS public.wishlist (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Cart
CREATE TABLE IF NOT EXISTS public.cart (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity      INT DEFAULT 1 CHECK (quantity > 0),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES public.profiles(id),
  address       JSONB NOT NULL,
  subtotal      NUMERIC(10,2) NOT NULL,
  discount      NUMERIC(10,2) DEFAULT 0,
  delivery_fee  NUMERIC(10,2) DEFAULT 0,
  total         NUMERIC(10,2) NOT NULL,
  payment_method TEXT DEFAULT 'cod' CHECK (payment_method IN ('cod','razorpay','upi','card','wallet')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed','refunded')),
  status        TEXT DEFAULT 'placed' CHECK (status IN ('placed','confirmed','shipped','delivered','cancelled','returned')),
  razorpay_order_id TEXT,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES public.products(id),
  seller_id     UUID REFERENCES public.sellers(id),
  name          TEXT NOT NULL,
  image         TEXT,
  price         NUMERIC(10,2) NOT NULL,
  quantity      INT NOT NULL,
  total         NUMERIC(10,2) NOT NULL
);

-- Order Tracking
CREATE TABLE IF NOT EXISTS public.order_tracking (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  status        TEXT NOT NULL,
  message       TEXT,
  location      TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id    UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id      UUID REFERENCES public.orders(id),
  rating        INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title         TEXT,
  comment       TEXT,
  images        TEXT[] DEFAULT '{}',
  is_verified   BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

-- Coupons
CREATE TABLE IF NOT EXISTS public.coupons (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code          TEXT UNIQUE NOT NULL,
  type          TEXT DEFAULT 'percent' CHECK (type IN ('percent','flat')),
  value         NUMERIC(10,2) NOT NULL,
  min_order     NUMERIC(10,2) DEFAULT 0,
  max_uses      INT DEFAULT 100,
  used_count    INT DEFAULT 0,
  expires_at    TIMESTAMPTZ,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_seller   ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_active   ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user       ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product   ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_user         ON public.cart(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user     ON public.wishlist(user_id);

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- UPDATE order updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sellers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons        ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users read own profile"    ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile"  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Addresses
CREATE POLICY "Users manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- Categories (public read)
CREATE POLICY "Anyone reads categories"   ON public.categories FOR SELECT USING (TRUE);

-- Sellers (public read)
CREATE POLICY "Anyone reads sellers"      ON public.sellers FOR SELECT USING (TRUE);
CREATE POLICY "Seller manages own store"  ON public.sellers FOR ALL USING (auth.uid() = user_id);

-- Products (public read, seller write)
CREATE POLICY "Anyone reads active products" ON public.products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Seller manages own products"  ON public.products FOR ALL
  USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

-- Wishlist
CREATE POLICY "Users manage own wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- Cart
CREATE POLICY "Users manage own cart"     ON public.cart FOR ALL USING (auth.uid() = user_id);

-- Orders
CREATE POLICY "Users read own orders"     ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create orders"       ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items
CREATE POLICY "Users read own order items" ON public.order_items FOR SELECT
  USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));

-- Order Tracking
CREATE POLICY "Users read own tracking"   ON public.order_tracking FOR SELECT
  USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));

-- Reviews (public read, auth write own)
CREATE POLICY "Anyone reads reviews"      ON public.reviews FOR SELECT USING (TRUE);
CREATE POLICY "Users write own review"    ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own review"   ON public.reviews FOR UPDATE USING (auth.uid() = user_id);

-- Coupons (public read active)
CREATE POLICY "Anyone reads active coupons" ON public.coupons FOR SELECT USING (is_active = TRUE);

-- ============================================================
-- SEED: SAMPLE CATEGORIES
-- ============================================================

INSERT INTO public.categories (name, slug, sort_order) VALUES
  ('Electronics',    'electronics',    1),
  ('Fashion',        'fashion',        2),
  ('Home & Kitchen', 'home-kitchen',   3),
  ('Beauty',         'beauty',         4),
  ('Sports',         'sports',         5),
  ('Books',          'books',          6),
  ('Mobiles',        'mobiles',        7),
  ('Appliances',     'appliances',     8)
ON CONFLICT (slug) DO NOTHING;
