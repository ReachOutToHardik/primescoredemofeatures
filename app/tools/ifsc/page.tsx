import type { Metadata } from 'next'
import IfscCode from '../../../src/views/tools/IfscCode'

export const metadata: Metadata = {
  title: 'IFSC Code Finder — Search Bank Branch by IFSC or Name',
  description: 'Find IFSC code of any Indian bank branch instantly. Search by IFSC code or browse by State, City, Bank, and Branch name.',
}

export default function IfscPage() {
  return <IfscCode />
}
