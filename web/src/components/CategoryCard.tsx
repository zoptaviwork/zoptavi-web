import { Link } from 'react-router-dom';

interface Props {
  name: string;
  slug: string;
  image: string;
}

export default function CategoryCard({ name, slug, image }: Props) {
  return (
    <Link
      to={`/category/${slug}`}
      className="flex flex-col items-center gap-2 group cursor-pointer"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#00A2A5] transition-all duration-200 bg-gray-100 group-hover:scale-105 transform shadow-sm">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs font-medium text-[#0F172A] group-hover:text-[#00A2A5] transition-colors text-center font-[Inter]">
        {name}
      </span>
    </Link>
  );
}
