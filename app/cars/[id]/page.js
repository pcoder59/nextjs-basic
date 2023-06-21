export async function generateMetadata({ params }) {
    const { id } = params;
    const carData = getCar(id);
    const [car] = await Promise.all([carData]);
    return { title: `${car.color} ${car.id}` };
}

async function getCar(id) {
    const req = await fetch(`http://localhost:3000/${id}.json`, { cache: 'no-store' });
    const data = await req.json();
    return data;
}

export default async function Car({ params }) {
    const { id } = params;
    const carData = getCar(id);
    const [car] = await Promise.all([carData]);
    return (
        <>
            <h1>Hello { id }</h1>
            <img src={car.image} />
        </>
    )
}

export async function getStaticPaths() {
    const req = await fetch('http://localhost:3000/cars.json', { cache: 'no-store' });
    const data = await req.json();
    const paths = data.map(car => {
        return {params: { id: car }}
    });
    return {
        paths,
        fallback: false
    };
}