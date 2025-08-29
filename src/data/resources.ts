import { Resource } from '../types';

export const resources: Resource[] = [
  {
    id: 'monero-wallet-gui',
    name: 'Monero GUI Wallet',
    category: 'wallet',
    platforms: ['win', 'mac', 'linux'],
    url: 'https://www.getmonero.org/downloads/',
    open_source: true,
    custodial: false,
    tags: ['beginner', 'official', 'full-node'],
    risk_notes: 'Official desktop wallet; verify signatures before install.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'The official Monero desktop wallet with full node capabilities'
  },
  {
    id: 'cake-wallet',
    name: 'Cake Wallet',
    category: 'wallet',
    platforms: ['ios', 'android'],
    url: 'https://cakewallet.com/',
    open_source: true,
    custodial: false,
    tags: ['mobile', 'beginner', 'multi-coin'],
    risk_notes: 'Popular mobile wallet; supports multiple cryptocurrencies.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'User-friendly mobile wallet with built-in exchange features'
  },
  {
    id: 'monerujo',
    name: 'Monerujo',
    category: 'wallet',
    platforms: ['android'],
    url: 'https://www.monerujo.io/',
    open_source: true,
    custodial: false,
    tags: ['mobile', 'lightweight'],
    risk_notes: 'Android-only wallet; community maintained.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'Lightweight Android wallet focused on privacy and ease of use'
  },
  {
    id: 'feather-wallet',
    name: 'Feather Wallet',
    category: 'wallet',
    platforms: ['win', 'mac', 'linux'],
    url: 'https://featherwallet.org/',
    open_source: true,
    custodial: false,
    tags: ['lightweight', 'advanced'],
    risk_notes: 'Community-developed lightweight wallet.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'Lightweight desktop wallet with advanced features for power users'
  },
  {
    id: 'moneropedia',
    name: 'Moneropedia',
    category: 'learning',
    platforms: ['web'],
    url: 'https://www.getmonero.org/resources/moneropedia/',
    open_source: true,
    custodial: false,
    tags: ['reference', 'official'],
    risk_notes: 'Official community-maintained encyclopedia.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'Comprehensive encyclopedia of Monero terminology and concepts'
  },
  {
    id: 'monero-site',
    name: 'Official Monero Website',
    category: 'learning',
    platforms: ['web'],
    url: 'https://www.getmonero.org/',
    open_source: true,
    custodial: false,
    tags: ['official', 'beginner'],
    risk_notes: 'Official project website with downloads and documentation.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'The official Monero project website with downloads, guides, and news'
  },
  {
    id: 'localmonero',
    name: 'LocalMonero',
    category: 'other',
    platforms: ['web'],
    url: 'https://localmonero.co/',
    open_source: false,
    custodial: true,
    tags: ['p2p', 'trading'],
    risk_notes: 'P2P trading platform; requires KYC verification in some cases.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'Peer-to-peer Monero trading platform with escrow protection'
  },
  {
    id: 'xmrchain',
    name: 'XMRChain.net',
    category: 'explorer',
    platforms: ['web'],
    url: 'https://xmrchain.net/',
    open_source: true,
    custodial: false,
    tags: ['explorer', 'privacy'],
    risk_notes: 'Community-maintained blockchain explorer.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'Privacy-respecting Monero blockchain explorer'
  },
  {
    id: 'reddit-monero',
    name: 'r/Monero',
    category: 'forum',
    platforms: ['web'],
    url: 'https://www.reddit.com/r/Monero/',
    open_source: false,
    custodial: false,
    tags: ['community', 'discussion'],
    risk_notes: 'Active community forum; verify information from multiple sources.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'Active Reddit community for Monero discussions and support'
  },
  {
    id: 'monero-rpc',
    name: 'Monero RPC Documentation',
    category: 'dev',
    platforms: ['web'],
    url: 'https://www.getmonero.org/resources/developer-guides/',
    open_source: true,
    custodial: false,
    tags: ['developer', 'api', 'official'],
    risk_notes: 'Official developer documentation.',
    status: 'active',
    last_verified: '2025-01-08',
    description: 'Official RPC and developer documentation for Monero integration'
  },
  {
    id: 'gupax',
    name: 'Gupax Monero Mining',
    category: 'dev',
    platforms: ['web'],
    url: 'https://github.com/Cyrix126/gupaxx#running-a-local-monero-node',
    open_source: true,
    custodial: false,
    tags: ['developer', 'api', 'official'],
    risk_notes: 'Official developer documentation.',
    status: 'active',
    last_verified: '2025-27-08',
    description: 'A fork of Gupax designed to simplify mining on P2Pool'
  }
];

export const categories = [
  { value: 'wallet', label: 'Wallets', icon: '💳' },
  { value: 'node', label: 'Nodes', icon: '🌐' },
  { value: 'explorer', label: 'Explorers', icon: '🔍' },
  { value: 'dev', label: 'Dev Tools', icon: '⚒️' },
  { value: 'learning', label: 'Learning', icon: '📚' },
  { value: 'forum', label: 'Forums', icon: '💬' },
  { value: 'governance', label: 'Governance', icon: '🏛️' },
  { value: 'other', label: 'Other', icon: '📦' }
];

export const platforms = [
  { value: 'win', label: 'Windows', icon: '🪟' },
  { value: 'mac', label: 'macOS', icon: '🍎' },
  { value: 'linux', label: 'Linux', icon: '🐧' },
  { value: 'android', label: 'Android', icon: '🤖' },
  { value: 'ios', label: 'iOS', icon: '📱' },
  { value: 'web', label: 'Web', icon: '🌐' }
];