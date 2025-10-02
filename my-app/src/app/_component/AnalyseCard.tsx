import { Article } from './types';
import Link from 'next/link';


export default function AnalysisCard({ article }: { article: Article }) {
    
    return (
          <div className={`
         p-4 rounded-lg hover:border-l-9 hover:-ml-2 border-l-4 transition-all duration-100 shadow-2xs
        ${article.sentiment === 'positive' 
          ? 'border-l-green-500 bg-green-50' 
          : article.sentiment === 'negative' 
          ? 'border-l-red-500 bg-red-50' 
          : 'border-l-blue-500 bg-blue-50'
        }
      `}>
            <Link href={article.link}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg flex-1 mr-4 text-black">{article.title}</h3>
              <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${article.sentiment === 'positive' 
              ? 'bg-green-100 text-green-800' 
              : article.sentiment === 'negative' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-blue-100 text-blue-800'
            }
          `}>
                {article.sentiment}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{article.snippet}</p>
            
            <div className="bg-white p-3 rounded border">
              <div className="text-xs font-semibold text-gray-900">AI Reasoning:</div>
              <div className="text-sm text-gray-600">{article.reasoning}</div>
            </div>
            </Link>
            
            
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Read full article →
            </a>
          </div>
      )
}
