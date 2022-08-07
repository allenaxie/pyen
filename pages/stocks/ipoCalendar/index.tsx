const IPOCalendarPage = ({upcomingIPO}:any) => {
    console.log(upcomingIPO);

    return (
        <>
            {upcomingIPO.map((item:any) => (
                <>
                    {item.symbol}
                    <br/>
                </>
            ))}
        </>
    )
}

export default IPOCalendarPage;

export async function getStaticProps (context:any) {
    const res = await fetch('https://upcoming-ipo-calendar.p.rapidapi.com/ipo-calendar', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
            'X-RapidAPI-Host': `${process.env.X_RapidAPI_Host}`,
        }
    })
    const {data} = await res.json();

    return {
        props: {
            upcomingIPO: data,
        }
    }
}