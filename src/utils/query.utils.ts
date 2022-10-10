export const getQueryString = (params: any): string => '?' + new URLSearchParams(params).toString();
