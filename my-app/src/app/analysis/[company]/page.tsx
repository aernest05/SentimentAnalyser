
import { AnalysisCardPage } from '../AnalysisPageClient';

export default async function fetchSentiment({params, }: {params: { company: string };}) {
  const awaitedParams = await params;
  const company = decodeURIComponent(awaitedParams.company);
  try {
        const url = new URL(`http://127.0.0.1:5000/api`);
        url.searchParams.set('company', company);

        const response = await fetch(url.toString())
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
        const data = await response.json();
        
        return <AnalysisCardPage sentimentData={data}/>
        
      } catch (err) {
        console.error('Fetch error:', err);
        return <div>Error loading sentiment data</div>;
      }
}