import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Book, Shield, Heart, Copy, Check, QrCode } from 'lucide-react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import BonsaiEffect from '../Effects/BonsaiEffect';
import VideoPlayer from '../VideoPlayer';

const HomePage: React.FC = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState('');
  const [qrCode, setQrCode] = useState('/XMR QR.jpg');

  const xmrAddress = '89GEmrGsgzVQoW4PWubAuQfbRJFSaD5TK4Hu9faAv95h7TS7Emqk1jF6JwswAryQezEcEThTTEd1FEKrpCevNSz8Dyfq1Ez';

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Tutor Chat',
      description: 'Get instant, privacy-focused guidance on Monero usage, wallets, and best practices.',
      link: '/chat',
      cta: 'Start Chat'
    },
    {
      icon: Book,
      title: 'Curated Resources',
      description: 'Browse vetted wallets, nodes, explorers, and tools.',
      link: '/resources',
      cta: 'Explore Resources'
    },
    {
      icon: Shield,
      title: 'Progressive Learning',
      description: 'Master Monero step-by-step with structured lessons covering privacy, security, and operations.',
      link: '/learn',
      cta: 'Start Learning'
    },
    {
      icon: Heart,
      title: 'Community Support',
      description: 'Connect with the community and get help when you need it most.',
      link: '/contact',
      cta: 'Get Help'
    }
  ];

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(''), 2000);
  };

  const showQRCode = () => {
    setShowDonateModal(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-black pt-16 pb-12 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video max-h-[70vh] rounded-lg overflow-hidden shadow-2xl">
            {/* Video Background */}
            <VideoPlayer 
              src="/Main.mp4" 
              className="rounded-lg"
            />
            
            {/* Dark Overlay for Better Text Readability */}
            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
          </div>
          
          {/* Mobile-only "Powered by AI" text */}
          <div className="md:hidden mt-4 text-center">
            <p className="text-slate-300 text-sm font-medium">Powered by AI</p>
            <p className="text-slate-300 text-sm font-medium">& Community-Vetted Resources</p>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="bg-black py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" icon={MessageCircle} className="w-full sm:w-auto shadow-2xl">
                Start Chat
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="secondary" size="lg" icon={Book} className="w-full sm:w-auto shadow-2xl">
                Explore Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 bg-black">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-6 font-noto-serif">
            Master Monero with Confidence and Clarity
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
            Everything you need to understand, secure, and use Monero effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} variant="feature" hover className="text-center">
                <div className="w-16 h-16 bg-deep-rose-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-deep-rose-500/25">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-4">{feature.title}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">{feature.description}</p>
                <Link to={feature.link}>
                  <Button variant="secondary" className="w-full">
                    {feature.cta}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6 font-noto-serif">
              Trusted by Privacy Advocates
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <p className="text-slate-300 mb-4">
                "Finally, a resource that explains Monero clearly without the technical jargon. Perfect for beginners."
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <Shield className="w-4 h-4" />
                <span>Privacy Researcher</span>
              </div>
            </Card>
            
            <Card className="text-center">
              <p className="text-slate-300 mb-4">
                "The curated resource directory saved me hours of research. Everything is vetted and up-to-date."
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <Shield className="w-4 h-4" />
                <span>Crypto Developer</span>
              </div>
            </Card>
            
            <Card className="text-center">
              <p className="text-slate-300 mb-4">
                "The AI tutor understands context and provides practical, safety-first advice. Impressive."
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <Shield className="w-4 h-4" />
                <span>Security Consultant</span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Donation Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 bg-black">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6 font-noto-serif">
            Support This Project
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
            If this helped, consider fueling future lessons. Your privacy-focused donations keep this resource free and growing.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <BonsaiEffect />
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Monero Donations</h3>
            <p className="text-slate-400">Primary funding method - completely private</p>
          </div>

          <div className="space-y-4">
            <div className="bg-deep-rose-800 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-slate-200 mb-2">XMR Address:</p>
              <div className="flex items-start sm:items-center justify-between bg-deep-rose-950 rounded p-3 gap-2 backdrop-blur-sm">
                <code className="text-xs text-slate-200 break-all font-mono flex-1 min-w-0">{xmrAddress}</code>
                <button
                  onClick={() => copyAddress(xmrAddress)}
                  className="p-1 text-slate-300 hover:text-slate-100 transition-colors flex-shrink-0"
                >
                  {copiedAddress === xmrAddress ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="secondary"
                icon={Copy}
                onClick={() => copyAddress(xmrAddress)}
              >
                {copiedAddress === xmrAddress ? 'Copied!' : 'Copy Address'}
              </Button>
              <Button
                variant="secondary"
                icon={QrCode}
                onClick={showQRCode}
              >
                Show QR Code
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-600/50">
            <p className="text-sm text-slate-400">
              All donations support development, hosting, and content creation. 
              Educational content remains free for everyone.
            </p>
          </div>
        </Card>
      </div>

      {/* Donation QR Modal */}
      <Modal
        isOpen={showDonateModal}
        onClose={() => {
          setShowDonateModal(false);
        }}
        title="Monero Donation"
        size="md"
      >
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <img src={qrCode} alt="XMR Address QR Code" className="border border-slate-600/50 rounded shadow-lg" />
          </div>
          
          <div className="bg-slate-700/80 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-slate-400 mb-2">XMR Address:</p>
            <div className="flex items-start sm:items-center justify-between bg-slate-900/80 rounded p-3 gap-2 backdrop-blur-sm">
              <code className="text-xs text-slate-300 break-all font-mono flex-1 min-w-0">{xmrAddress}</code>
              <button
                onClick={() => copyAddress(xmrAddress)}
                className="p-1 text-slate-400 hover:text-slate-100 transition-colors flex-shrink-0"
              >
                {copiedAddress === xmrAddress ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => copyAddress(xmrAddress)}
            className="w-full"
            icon={Copy}
          >
            {copiedAddress === xmrAddress ? 'Address Copied!' : 'Copy Address'}
          </Button>

          <p className="text-sm text-slate-400">
            Scan the QR code or copy the address to send Monero donations.
            Thank you for supporting privacy-focused education!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;