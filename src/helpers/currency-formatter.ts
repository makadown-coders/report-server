
export class CurrencyFormatter {
    static formatCurrency(value: number): string {
        return new Intl.NumberFormat('es-MX', 
            { 
                style: 'currency', 
                currency: 'MXN' 
            }).format(value);
    }
}
