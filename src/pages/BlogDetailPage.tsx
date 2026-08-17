import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Clock, User, Sparkles, BookOpen, Globe, Search } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { blogs, selectedBlogSlug, products, setCurrentPage } = useStore();

  const article = blogs.find(b => b.slug === selectedBlogSlug) || blogs[0];

  // Inject Meta Title and Meta Description for Search Console indexing
  useEffect(() => {
    if (article) {
      const pageTitle = article.metaTitle || `${article.title} | Terra & Linen`;
      document.title = pageTitle;

      let metaDescTag = document.querySelector('meta[name="description"]');
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescTag);
      }
      metaDescTag.setAttribute('content', article.metaDescription || article.excerpt);

      return () => {
        document.title = 'Terra & Linen | Artisanal Goods & Textiles';
      };
    }
  }, [article]);

  if (!article) return null;

  // Find recommended products linked to this blog post
  const recommendedProducts = products.filter(p => 
    article.recommendedProductIds && article.recommendedProductIds.includes(p.id)
  );

  const isHtmlMarkup = article.content && article.content.includes('<') && article.content.includes('>');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button & SEO Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          id="blog-detail-back-btn"
          onClick={() => setCurrentPage('blogs')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C827A] hover:text-[#2C221E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        {article.metaTitle && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#5B6B54]/10 border border-[#5B6B54]/20 text-[11px] font-mono text-[#5B6B54]">
            <Globe className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">SEO Meta Active: {article.metaTitle}</span>
          </div>
        )}
      </div>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6B54]/10 text-[#5B6B54] text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          {article.category}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C221E] leading-tight">
          {article.title}
        </h1>

        {article.metaDescription && (
          <p className="text-xs sm:text-sm text-[#8C827A] font-light leading-relaxed max-w-2xl italic border-l-2 border-[#5B6B54] pl-3">
            Search Result Snippet: "{article.metaDescription}"
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#8C827A] border-y border-[#E6E0D8] py-3">
          <span className="flex items-center gap-1.5 font-medium text-[#2C221E]">
            <User className="w-3.5 h-3.5 text-[#5B6B54]" />
            {article.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5B6B54]" />
            {article.readTime}
          </span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
      </header>

      {/* Main Image */}
      {article.image && (
        <div className="aspect-16/9 rounded-3xl overflow-hidden border border-[#E6E0D8] shadow-lg">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content - Render HTML cleanly or Markdown */}
      <article className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed text-[#2C221E] font-light space-y-4">
        {isHtmlMarkup ? (
          <div
            id="blog-uploaded-html-content"
            className="raw-html-container space-y-4 text-[#2C221E] [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-2 [&_p]:my-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#5B6B54] [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-2xl [&_img]:my-4 [&_a]:text-[#5B6B54] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('# ')) {
              return (
                <h2 key={idx} className="font-serif text-2xl font-bold text-[#2C221E] pt-4">
                  {paragraph.replace('# ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={idx} className="font-serif text-xl font-bold text-[#2C221E] pt-3">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-[#2C221E]/90 leading-relaxed">
                {paragraph}
              </p>
            );
          })
        )}
      </article>

      {/* Embedded Product Recommendation CTAs */}
      {recommendedProducts.length > 0 && (
        <section className="pt-10 border-t border-[#E6E0D8] bg-[#F7F4EE] p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#5B6B54]" />
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                Featured Goods Mentioned in This Journal
              </h3>
              <p className="text-xs text-[#8C827A]">
                Handpicked artisanal products referenced in this article.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
