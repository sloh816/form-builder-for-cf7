
export interface FormField {
	component: string;
	props: Record<string, any>;
}

export interface Form {
	id: string;
	name: string;
	email: string;
	domain?: string;
	subject?: string;
	introText?: string;
	fields: FormField[];
	styles?: Record<string, string>;
}