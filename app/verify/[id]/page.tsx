import type { Metadata } from 'next'
import VerifyCredential from '../../../src/views/VerifyCredential'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Credential Verification #${id} | Primescore`,
    description: `Verify credentials and internship completions issued under registry code ${id}.`,
    robots: {
      index: false,
      follow: true
    }
  }
}

export default async function VerifyPage({ params }: Props) {
  const { id } = await params
  return <VerifyCredential id={id} />
}
