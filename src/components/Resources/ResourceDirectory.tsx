import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Resource, FilterState } from '../../types';
import { resources, categories, platforms } from '../../data/resources';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';

const ResourceDirectory: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    platforms: [],
    tags: [],
    openSourceOnly: false,
    nonCustodialOnly: false
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchableText = `${resource.name} ${resource.description || ''} ${resource.tags.join(' ')}`.toLowerCase();
        if (!searchableText.includes(searchLower)) return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(resource.category)) {
        return false;
      }

      // Platform filter
      if (filters.platforms.length > 0) {
        const hasCommonPlatform = resource.platforms.some(platform => 
          filters.platforms.includes(platform)
        );
        if (!hasCommonPlatform) return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasCommonTag = resource.tags.some(tag => 
          filters.tags.includes(tag)
        );
        if (!hasCommonTag) return false;
      }

      // Open source filter
      if (filters.openSourceOnly && !resource.open_source) {
        return false;
      }

      // Non-custodial filter
      if (filters.nonCustodialOnly && resource.custodial) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentArray = prev[filterType] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [filterType]: newArray
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      platforms: [],
      tags: [],
      openSourceOnly: false,
      nonCustodialOnly: false
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'archived':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    resources.forEach(resource => {
      resource.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 font-noto-serif">
          Monero Resources
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl">
          Curated, community-vetted Monero links. Filter by platform, openness, and use-case.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search resources..."
              value={filters.search}
              onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
              icon={Search}
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            icon={Filter}
          >
            Filters {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f === true) && '(Active)'}
          </Button>
          {(filters.search || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f === true)) && (
            <Button variant="tertiary" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-slate-100 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category.value)}
                        onChange={() => toggleFilter('categories', category.value)}
                        className="rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-slate-300">
                        {category.icon} {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div>
               <h3 className="font-semibold text-slate-100 mb-3">Platforms</h3>
                <div className="space-y-2">
                  {platforms.map(platform => (
                    <label key={platform.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.platforms.includes(platform.value)}
                        onChange={() => toggleFilter('platforms', platform.value)}
                       className="rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500"
                      />
                     <span className="text-sm text-slate-300">
                        {platform.icon} {platform.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags and Properties */}
              <div>
               <h3 className="font-semibold text-slate-100 mb-3">Properties</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.openSourceOnly}
                      onChange={() => setFilters(prev => ({ ...prev, openSourceOnly: !prev.openSourceOnly }))}
                     className="rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500"
                    />
                   <span className="text-sm text-slate-300">Open Source Only</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.nonCustodialOnly}
                      onChange={() => setFilters(prev => ({ ...prev, nonCustodialOnly: !prev.nonCustodialOnly }))}
                     className="rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500"
                    />
                   <span className="text-sm text-slate-300">Non-Custodial Only</span>
                  </label>
                </div>

               <h4 className="font-semibold text-slate-100 mt-4 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 8).map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleFilter('tags', tag)}
                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                        filters.tags.includes(tag)
                         ? 'bg-red-600 border-red-500 text-white shadow-md'
                         : 'bg-gray-800 border-gray-600 text-slate-300 hover:border-gray-500'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-slate-400">
          Showing {filteredResources.length} of {resources.length} resources
        </p>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} variant="feature" hover className="h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-slate-100">{resource.name}</h3>
              </div>
              <div className="flex items-center space-x-1">
                {getStatusIcon(resource.status)}
                <span className="text-xs text-slate-500 capitalize">{resource.status}</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              {resource.description || 'No description available'}
            </p>

            {/* Platforms */}
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.platforms.map(platform => {
                const platformData = platforms.find(p => p.value === platform);
                return (
                  <span
                    key={platform}
                    className="inline-flex items-center px-2 py-1 text-xs bg-gray-800 text-slate-300 rounded"
                  >
                    {platformData?.icon} {platformData?.label || platform}
                  </span>
                );
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {resource.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-deep-rose-900/40 text-deep-rose-300 rounded"
                >
                  {tag}
                </span>
              ))}
              {resource.tags.length > 4 && (
                <span className="px-2 py-1 text-xs text-slate-500">
                  +{resource.tags.length - 4} more
                </span>
              )}
            </div>

            {/* Properties */}
            <div className="flex items-center space-x-4 mb-4 text-sm">
              <span className={`${resource.open_source ? 'text-green-400' : 'text-gray-500'}`}>
                {resource.open_source ? '✓' : '✗'} Open Source
              </span>
              <span className={`${!resource.custodial ? 'text-green-400' : 'text-yellow-400'}`}>
                {resource.custodial ? 'Custodial' : 'Non-custodial'}
              </span>
            </div>

            {/* Risk Notes */}
            {resource.risk_notes && (
              <div className="mb-4 p-3 bg-amber-900/25 border border-amber-600/40 rounded text-sm backdrop-blur-sm">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-amber-200">{resource.risk_notes}</span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4">
              <span className="text-xs text-slate-500">
                Updated {new Date(resource.last_verified).toLocaleDateString()}
              </span>
              <Button
                variant="primary"
                size="sm"
                icon={ExternalLink}
                onClick={() => window.open(resource.url, '_blank')}
              >
                Visit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-slate-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="mb-4">Try adjusting your filters or search terms</p>
            <Button variant="secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ResourceDirectory;