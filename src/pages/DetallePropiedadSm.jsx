import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import Carousel from 'react-bootstrap/Carousel';
import { obtenerAmenities } from '../api/propiedadesAPI'
import { Footer } from '../components/Footer'


export function DetallePropiedadSm({ propiedad }) {
    const api_key = 'AIzaSyAf9qdKYg8ab1l1ufJaWJoE7SMC4gwuVtk'
    const direccion = 'misiones 134, mar del plata, buenos aires'
    const { imagenes } = propiedad
    const { amenities } = propiedad
    const [amenitiesApi, setAmenitiesApi] = useState([])
    async function cargarAmenities() {
        const { data } = await obtenerAmenities()
        if (amenities !== undefined)
            setAmenitiesApi(amenities.map(a => data.find(ap => ap.id === a)))
    }
    cargarAmenities()

    return (
        <>
            <Navbar />
            <section className='detalle-section-sm'>
                <div className="detalle-imagenes-sm">

                    <Carousel fade>
                        {imagenes !== undefined && imagenes.map(i =>
                            <Carousel.Item key={i.id}>
                                <img src={i.imagen} alt={propiedad.titulo_propiedad} />
                            </Carousel.Item>)}

                    </Carousel>

                </div>
                <div className='detalle-body-sm'>
                    <h1>{propiedad.titulo_propiedad}</h1>
                    <p className='ubicacion'>{propiedad.ubicacion}</p>
                    <p className='id'>Id: {propiedad.ficha}</p>
                    <p className='descripcion'>
                        {propiedad.descripcion}
                    </p>
                    <div className='lista'>
                        <h2>Mas detalles</h2>
                        <ul>
                            <li><span>Metros totales: </span>{propiedad.metros_totales}</li>
                            <li><span>Metros cubiertos: </span>{propiedad.metros_cubiertos}</li>
                            <li><span>Metros descubiertos: </span>{propiedad.metros_descubiertos}</li>
                            <li><span>Metros semidescubiertos: </span>{propiedad.metros_semidescubiertos}</li>
                            <li><span>Baños: </span>{propiedad.baños}</li>
                            <li><span>Pmbientes: </span>{propiedad.ambientes}</li>
                            <li><span>Dormitorio: </span>{propiedad.dormitorios}</li>
                            <li><span>Plantas: </span>{propiedad.plantas}</li>
                        </ul>
                    </div>
                    <div className='lista'>
                        <h2>Mas detalles</h2>
                        <ul>
                            {amenitiesApi.map(a => <li key={a.id}>{a.tipo}</li>)}
                        </ul>
                    </div>
                    <div className='ubicacion-container'>
                        <h2>{propiedad.ubicacion}</h2>
                        <iframe
                            width={'100%'}
                            height={450}
                            style={{ border: "0" }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${propiedad.ubicacion !== undefined && propiedad.ubicacion.replaceAll(' ', '+')}`}>
                        </iframe>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}