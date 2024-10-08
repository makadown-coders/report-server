
export class DateFormatter {

    static formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    static getDDMMMMYYYY(date: Date): string {
        return this.formatter.format(date);
    }
}