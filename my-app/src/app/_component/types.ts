export interface Article {
    title: string;
    link: string;
    sentiment: "positive" | "negative" | "neutral";
    reasoning: string;
    snippet: string;
}

export interface SearchLog {
    created_at: string;
    company_query: string;
}

export interface ConfirmationModalProps {
    openModal: (value: boolean) => void;
    confirmSearch: () => void;
    companyQuery: string,
}