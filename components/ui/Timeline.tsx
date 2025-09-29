import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  type?: 'work' | 'education' | 'project';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return <Briefcase className="w-5 h-5" />;
    case 'education':
      return <GraduationCap className="w-5 h-5" />;
    case 'project':
      return <Calendar className="w-5 h-5" />;
    default:
      return <Calendar className="w-5 h-5" />;
  }
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative w-full py-8", className)}>      
      <div className="relative">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <div key={index} className="relative pb-12">
              {/* Connecting line to next item (except for last item) */}
              {index < items.length - 1 && (
                <div className="absolute left-6 md:left-1/2 top-12 w-1 h-[calc(100%-3rem)] bg-portfolio transform md:-translate-x-0.5 z-0"></div>
              )}
              
              {/* Mobile Layout (left-aligned) */}
              <div className="flex items-start md:hidden">
                <div className="relative z-20 flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-12 h-12 border-3 border-portfolio rounded-full bg-transparent">
                    <div className="text-portfolio">
                      {getIcon(item.type)}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <time className="text-sm font-medium text-portfolio bg-portfolio/15 px-3 py-1 rounded-full border border-portfolio/20">
                      {item.date}
                    </time>
                  </div>
                  <h3 className="text-xl font-bold text-portfolio mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Desktop Layout (zig-zag) */}
              <div className="hidden md:flex items-center w-full relative">
                {/* Left Content */}
                <div className={`w-1/2 ${isLeft ? 'pr-12' : 'pr-0'}`}>
                  {isLeft && (
                    <div className="text-right relative">
                      <div className="flex items-center justify-end mb-2">
                        <time className="text-sm font-medium text-portfolio bg-portfolio/15 px-3 py-1 rounded-full border border-portfolio/20">
                          {item.date}
                        </time>
                      </div>
                      <h3 className="text-xl font-bold text-portfolio mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Central Icon with transparent ring */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 z-20">
                  <div className="flex items-center justify-center w-12 h-12 border-3 border-portfolio rounded-full bg-transparent">
                    <div className="text-portfolio">
                      {getIcon(item.type)}
                    </div>
                  </div>
                </div>
                
                {/* Right Content */}
                <div className={`w-1/2 ${!isLeft ? 'pl-12' : 'pl-0'}`}>
                  {!isLeft && (
                    <div className="text-left relative">
                      <div className="flex items-center mb-2">
                        <time className="text-sm font-medium text-portfolio bg-portfolio/15 px-3 py-1 rounded-full border border-portfolio/20">
                          {item.date}
                        </time>
                      </div>
                      <h3 className="text-xl font-bold text-portfolio mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface CompactTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function CompactTimeline({ items, className }: CompactTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="space-y-0">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {/* Connecting line for compact timeline */}
            {index !== items.length - 1 && (
              <div className="absolute left-2 top-4 h-16 w-0.5 bg-portfolio z-0"></div>
            )}
            
            {/* Small ring indicator with icon */}
            <div className="relative z-10 flex-shrink-0 mr-4 mt-1">
              <div className="flex items-center justify-center w-4 h-4 border border-portfolio rounded-full bg-transparent">
                <div className="w-1.5 h-1.5 bg-portfolio rounded-full"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 pb-3">
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30 hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:border-portfolio/30 dark:hover:border-portfolio/20 transition-all duration-300">
                <div className="flex items-center space-x-2 mb-1">
                  <time className="text-xs font-medium text-portfolio bg-portfolio/10 px-2 py-1 rounded-md">
                    {item.date}
                  </time>
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  {item.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}