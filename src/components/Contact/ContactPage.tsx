import React, { useState } from 'react';
import { Heart, Mail, MessageCircle, Github, Copy, Check, QrCode } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import BonsaiEffect from '../Effects/BonsaiEffect';

const ContactPage: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState('');
  const [showDonateModal, setShowDonateModal] = useState(false);

  const xmrAddress = '89GEmrGsgzVQoW4PWubAuQfbRJFSaD5TK4Hu9faAv95h7TS7Emqk1jF6JwswAryQezEcEThTTEd1FEKrpCevNSz8Dyfq1Ez';

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(''), 2000);
  };

  const showQRCode = () => {
    setShowDonateModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-ink-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 font-noto-serif">
          Contact & Support
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Get help, provide feedback, or support the project.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Support Options */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="w-6 h-6 text-deep-rose-500" />
              <h2 className="text-xl font-semibold text-slate-100">Get Help</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-charcoal/50 rounded-lg border border-slate-700/50">
                <h3 className="font-medium text-slate-100 mb-2">AI Tutor Chat</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Get instant answers to your Monero questions through our AI-powered chat.
                </p>
                <Button variant="primary" size="sm" icon={MessageCircle}>
                  Start Chat
                </Button>
              </div>
              
              <div className="p-4 bg-charcoal/50 rounded-lg border border-slate-700/50">
                <h3 className="font-medium text-slate-100 mb-2">Community Forums</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Connect with the Monero community for peer support and discussions.
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  icon={Github}
                  onClick={() => window.open('https://www.reddit.com/r/Monero/', '_blank')}
                >
                  r/Monero
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-deep-rose-500" />
              <h2 className="text-xl font-semibold text-slate-100">Feedback</h2>
            </div>
            
            <p className="text-slate-300 text-sm mb-4">
              Have suggestions for improving the AI Tutor or want to report an issue? 
              We'd love to hear from you.
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="secondary" 
                size="sm" 
                icon={Github}
                onClick={() => window.open('https://github.com/monero-project/monero', '_blank')}
                className="w-full"
              >
                Monero Project GitHub
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                icon={MessageCircle}
                onClick={() => window.open('https://www.reddit.com/r/Monero/', '_blank')}
                className="w-full"
              >
                Community Discussion
              </Button>
            </div>
          </Card>
        </div>

        {/* Donation Section */}
        <div>
          <Card>
            <div className="text-center mb-6">
              <BonsaiEffect />
              <h2 className="text-xl font-semibold text-slate-100 mb-2">Support This Project</h2>
              <p className="text-slate-400 text-sm">
                Help keep this resource free and growing with privacy-focused donations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-700/80 p-4 rounded-lg backdrop-blur-sm border border-slate-600/50">
                <p className="text-sm text-slate-400 mb-2">XMR Address:</p>
                <div className="flex items-start sm:items-center justify-between bg-ink-black/80 rounded p-3 gap-2 backdrop-blur-sm border border-slate-700/30">
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

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={() => copyAddress(xmrAddress)}
                  className="flex-1"
                  icon={Copy}
                >
                  {copiedAddress === xmrAddress ? 'Copied!' : 'Copy Address'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={showQRCode}
                  icon={QrCode}
                >
                  QR Code
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-slate-400">
                <Heart className="w-4 h-4 text-deep-rose-500" />
                <span className="text-sm">Thank you for supporting privacy education!</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Donation QR Modal */}
      <Modal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
        title="Monero Donation"
        size="md"
      >
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <img 
              src="/XMR QR.jpg" 
              alt="XMR Address QR Code" 
              className="border border-slate-600/50 rounded shadow-lg max-w-full h-auto" 
            />
          </div>
          
          <div className="bg-slate-700/80 p-4 rounded-lg backdrop-blur-sm border border-slate-600/50">
            <p className="text-sm text-slate-400 mb-2">XMR Address:</p>
            <div className="flex items-start sm:items-center justify-between bg-ink-black/80 rounded p-3 gap-2 backdrop-blur-sm border border-slate-700/30">
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

export default ContactPage;