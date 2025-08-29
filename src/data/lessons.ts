import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Monero',
    summary: 'Learn what makes Monero unique and how to take your first steps safely.',
    sections: [
      {
        heading: 'What is Monero?',
        body_md: `Monero (XMR) is private, digital cash that allows you to send and receive payments without revealing your identity, transaction amounts, or account balances.

Unlike Bitcoin, where all transactions are visible on a public ledger, Monero uses advanced cryptographic techniques to ensure privacy by default.

**Key features:**
- **Private by default** - All transactions are confidential
- **Untraceable** - Sender, receiver, and amounts are hidden
- **Fungible** - Every coin is equal and interchangeable
- **Decentralized** - No central authority controls the network`
      },
      {
        heading: 'Why Privacy Matters',
        body_md: `Financial privacy is a fundamental human right. Without it:

- Your spending habits can be tracked and analyzed
- Your wealth and income become public knowledge  
- You may face discrimination or targeting
- Your financial freedom can be restricted

Monero protects these rights by making privacy the default, not an option.`
      },
      {
        heading: 'Your First Steps',
        body_md: `1. **Choose a wallet** - Start with the official GUI wallet for desktop or Cake Wallet for mobile
2. **Verify downloads** - Always check signatures and download from official sources
3. **Create your wallet** - Follow the setup process and securely store your seed phrase
4. **Practice with small amounts** - Get comfortable with sending/receiving before larger transactions
5. **Learn about nodes** - Consider running your own node for maximum privacy`
      }
    ],
    related_resources: ['monero-wallet-gui', 'cake-wallet', 'moneropedia']
  },
  {
    slug: 'wallet-setup',
    title: 'Setting Up Your First Wallet',
    summary: 'Step-by-step guide to securely creating and configuring a Monero wallet.',
    sections: [
      {
        heading: 'Choosing the Right Wallet',
        body_md: `Different wallets serve different needs:

**Desktop Wallets:**
- **GUI Wallet** - Official, full-featured, runs a full node
- **Feather Wallet** - Lightweight, advanced features

**Mobile Wallets:**
- **Cake Wallet** - User-friendly, iOS and Android
- **Monerujo** - Android-only, lightweight

**Consider these factors:**
- Security level needed
- Device compatibility  
- Technical expertise
- Privacy requirements`
      },
      {
        heading: 'Installation and Setup',
        body_md: `**Security first:**

1. **Download from official sources only**
   - getmonero.org for GUI wallet
   - Verify GPG signatures when possible

2. **Create a secure environment**
   - Use updated antivirus software
   - Ensure stable internet connection
   - Close unnecessary applications

3. **Generate your wallet**
   - Choose a strong password
   - Write down your 25-word seed phrase
   - Store the seed phrase securely offline

4. **Test your setup**
   - Restore wallet from seed phrase
   - Verify you can access funds before receiving large amounts`
      },
      {
        heading: 'Backup Best Practices',
        body_md: `Your seed phrase is your wallet - protect it:

- **Write it down** on paper, never store digitally
- **Multiple copies** in separate secure locations  
- **Metal storage** for fire/water protection
- **Never share** your seed phrase with anyone
- **Test restoration** periodically to ensure backups work

**Additional backups:**
- Export wallet keys separately
- Note wallet creation date
- Save wallet file in encrypted storage`
      }
    ],
    related_resources: ['monero-wallet-gui', 'feather-wallet', 'cake-wallet']
  },
  {
    slug: 'privacy-fundamentals',
    title: 'Monero Privacy Fundamentals',
    summary: 'Understanding ring signatures, stealth addresses, and RingCT technology.',
    sections: [
      {
        heading: 'The Three Pillars of Privacy',
        body_md: `Monero uses three key technologies to ensure complete privacy:

**1. Ring Signatures** - Hide who sent the transaction
- Your real transaction is mixed with decoy outputs
- External observers cannot determine the true sender
- Ring size of 16 provides strong anonymity

**2. Stealth Addresses** - Hide who received the transaction  
- Each payment creates a unique, unlinkable address
- Only sender and receiver can identify the connection
- Public addresses can be safely shared

**3. RingCT (Ring Confidential Transactions)** - Hide transaction amounts
- Amounts are cryptographically hidden
- Network can verify transactions without seeing values
- Prevents amount correlation attacks`
      },
      {
        heading: 'How Ring Signatures Work',
        body_md: `When you send Monero:

1. Your wallet selects decoy outputs from the blockchain
2. These decoys are mixed with your real output  
3. A ring signature is created that proves one output in the ring was spent
4. Outside observers cannot determine which output was actually spent

**Key points:**
- Decoys are selected automatically by your wallet
- More recent outputs are preferred as decoys
- The ring size (currently 16) provides the anonymity set`
      },
      {
        heading: 'Operational Security Tips',
        body_md: `Maximize your privacy:

**Network-level privacy:**
- Use Tor or VPN when possible
- Run your own node
- Avoid reusing addresses (though less critical than with Bitcoin)

**Behavioral privacy:**
- Don't link your identity to your wallet address
- Be cautious when converting to/from other cryptocurrencies
- Avoid sharing transaction details publicly

**Advanced techniques:**
- Use subaddresses for different purposes
- Consider churning for additional privacy
- Understand timing correlation risks`
      }
    ],
    related_resources: ['moneropedia', 'monero-site']
  }
];