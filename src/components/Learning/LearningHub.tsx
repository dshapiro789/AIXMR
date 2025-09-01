import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Shield, Users, Zap, ArrowRight, Clock, Target } from 'lucide-react';
import { lessons } from '../../data/lessons';
import Card from '../UI/Card';
import Button from '../UI/Button';

const LearningHub: React.FC = () => {
  const learningPaths = [
    {
      title: 'Beginner Path',
      description: 'Start your Monero journey with essential concepts and safe practices.',
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-600/40',
      lessons: ['getting-started', 'wallet-setup'],
      duration: '30 min'
    },
    {
      title: 'Privacy Expert',
      description: 'Deep dive into Monero\'s privacy technologies and advanced usage.',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-600/40',
      lessons: ['privacy-fundamentals'],
      duration: '45 min'
    },
    {
      title: 'Technical Mastery',
      description: 'Advanced topics for developers and power users.',
      icon: Zap,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-600/40',
      lessons: [],
      duration: 'Coming Soon'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-ink-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 font-noto-serif">
          Learn Monero (Coming Soon)
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl">
          Master Monero through structured lessons covering privacy, security, and practical usage.
        </p>
      </div>

      {/* Learning Paths */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-slate-100 mb-6">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <Card key={index} className={`${path.bgColor} ${path.borderColor} hover:shadow-lg transition-all duration-200`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${path.bgColor}`}>
                    <Icon className={`w-5 h-5 ${path.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">{path.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{path.duration}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {path.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {path.lessons.length} lesson{path.lessons.length !== 1 ? 's' : ''}
                  </span>
                  {path.lessons.length > 0 ? (
                    <Button variant="secondary" size="sm" icon={ArrowRight}>
                      Start Path
                    </Button>
                  ) : (
                    <span className="text-xs text-slate-500">Coming Soon</span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Individual Lessons */}
      <div>
        <h2 className="text-xl font-semibold text-slate-100 mb-6">All Lessons</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.slug} variant="feature" hover>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-deep-rose-800 rounded-lg flex items-center justify-center shadow-lg shadow-deep-rose-500/25">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-100 mb-2">{lesson.title}</h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    {lesson.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Target className="w-3 h-3" />
                      <span>{lesson.sections.length} sections</span>
                    </div>
                    <Link to={`/learn/${lesson.slug}`}>
                      <Button variant="secondary" size="sm" icon={ArrowRight}>
                        Read
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHub;