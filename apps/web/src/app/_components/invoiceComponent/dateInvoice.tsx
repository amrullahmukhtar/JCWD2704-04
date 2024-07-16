"use client"

export default function DateInvoice({ date }: { date: string }) {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <p>{`Date: ${new Date(date).toLocaleDateString([navigator.language], options)}`}</p>
    );
}



// const options: Intl.DateTimeFormatOptions = {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     timeZoneName: 'short'
// };