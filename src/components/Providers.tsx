'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { ThemeProvider } from '@/components/ThemeProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  const solanaConnectors = toSolanaWalletConnectors();
	
	return (
		<ThemeProvider>
			<PrivyProvider
				appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
				config={{
					loginMethods: ['wallet'],
					appearance: {
						theme: 'light',
						accentColor: '#676FFF',
						logo: '/images/logomark@2x.png',
					},
					externalWallets: {
						solana: {
							connectors: solanaConnectors,
						},
					},
				}}
			>
				{children}
			</PrivyProvider>
		</ThemeProvider>
  );
}