INSERT INTO page_content (page, key, label, value, type, sort_order)
VALUES ('services','ai_lead','AI block — tagline','Automate the boring, scale the exciting.','text',(SELECT COALESCE(MAX(sort_order),0)+1 FROM page_content WHERE page='services'))
ON CONFLICT(page,key) DO UPDATE SET value=excluded.value, label=excluded.label;

INSERT INTO page_content (page, key, label, value, type, sort_order)
VALUES ('services','ai_bullets','AI block — bullet points (one per line)','AI handles the busywork, you handle the profits.
No more "out of stock" nightmares.
Abandoned carts, no more abandoned.','textarea',(SELECT COALESCE(MAX(sort_order),0)+1 FROM page_content WHERE page='services'))
ON CONFLICT(page,key) DO UPDATE SET value=excluded.value, label=excluded.label;

INSERT INTO page_content (page, key, label, value, type, sort_order)
VALUES ('services','ai_cap','AI block — caption','AI & automation - workflows built around your store','text',(SELECT COALESCE(MAX(sort_order),0)+1 FROM page_content WHERE page='services'))
ON CONFLICT(page,key) DO UPDATE SET value=excluded.value, label=excluded.label;
