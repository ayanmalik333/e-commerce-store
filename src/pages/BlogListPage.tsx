import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BookOpen, Clock, User, ArrowRight, Search } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  const { blogs, setSelectedBlogSlug, setCurrentPage } = useStore();
  const [blogSearch, setBlogSearch] = useState('');

  const filteredBlogs = blogs.filter(b => 
    !blogSearch || 
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
    (b.metaTitle && b.metaTitle.toLowerCase().includes(blogSearch.toLowerCase())) ||
    (b.metaDescription && b.metaDescription.toLowerCase().includes(blogSearch.toLowerCase()))
  );

  const handleReadArticle = (slug: string) => {
    setSelectedBlogSlug(slug);
    setCurrentPage('blog-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="bg-[#F7F4EE] rounded-3xl p-8 sm:p-12 border border-[#E6E0D8] text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#5B6B54]">
          Atelier Journal & SEO Articles
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C221E]">
          Stories on Slow Living & Craft
        </h1>
        <p className="text-xs sm:text-sm text-[#8C827A] font-light max-w-xl mx-auto leading-relaxed">
          Guides on natural linen care, Portuguese pottery history, and curating warm, grounded home sanctuaries.
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3.5" />
          <input
            id="blog-search-input"
            type="text"
            placeholder="Search articles on linen, ceramics, interior tips..."
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none focus:border-[#5B6B54]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map(article => (
          <article
            key={article.id}
            id={`blog-card-${article.id}`}
            onClick={() => handleReadArticle(article.slug)}
            className="group bg-[#F7F4EE] rounded-3xl overflow-hidden border border-[#E6E0D8] hover:border-[#5B6B54]/50 transition-all duration-300 hover:shadow-lg flex flex-col cursor-pointer"
          >
            <div className="aspect-16/10 overflow-hidden relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#2C221E]/80 backdrop-blur-xs text-[#FDFBF7] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {article.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-[#8C827A]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#5B6B54]" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#5B6B54] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-[#8C827A] line-clamp-3 leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6E0D8] flex items-center justify-between text-xs font-semibold text-[#5B6B54]">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#8C827A]" />
                  <span className="text-[#8C827A] font-normal">{article.author.split(',')[0]}</span>
                </span>

                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
