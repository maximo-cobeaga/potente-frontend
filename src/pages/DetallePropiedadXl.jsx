import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import Carousel from 'react-bootstrap/Carousel';
import { obtenerAmenities } from '../api/propiedadesAPI'
import { Cordoba } from '../components/Cordoba'
import { Trabajadores } from '../components/Trabajadores'
import { Footer } from '../components/Footer'



export function DetallePropiedadXl({ propiedad }) {
    const api_key = 'AIzaSyAf9qdKYg8ab1l1ufJaWJoE7SMC4gwuVtk'
    const direccion = 'misiones 134, mar del plata, buenos aires'
    const [amenitiesApi, setAmenitiesApi] = useState([])
    const [fix, setFix] = useState(false)


    function setFixedSidebar() {
        if (window.scrollY >= 700) {
            setFix(true)
        } else {
            setFix(false)
        }
    }
    window.addEventListener("scroll", setFixedSidebar)


    const { amenities } = propiedad
    async function cargarAmenities() {
        const { data } = await obtenerAmenities()
        if (amenities !== undefined)
            setAmenitiesApi(amenities.map(a => data.find(ap => ap.id === a)))
    }


    const { imagenes } = propiedad
    const { tipo_propiedad } = propiedad
    cargarAmenities()


    return (
        <>
            <Navbar />
            <section className="detalle-section">
                <div className="detalle-imagenes">

                    <Carousel fade>
                        {imagenes !== undefined &&
                            imagenes.map(i =>
                                <Carousel.Item key={i.id}>
                                    <img src={i.imagen} alt={propiedad.titulo} />
                                </Carousel.Item>)}
                    </Carousel>
                    <div className="ubicacion">
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
                <div className="detalle-content">
                    <div className="detalle-body">
                        <h2>{propiedad.titulo_propiedad}</h2>
                        <p className='detalle-direccion'>{propiedad.ubicacion}</p>
                        <p>Id: {propiedad.ficha}</p>
                        <p>Tipo : {propiedad.tipo_propiedad}</p>
                        <p className="detalle-descripcion">
                            {propiedad.descripcion}
                        </p>
                        <div className="detalle-detalles descrip-sec">
                            <hr />
                            <h3>Detalles</h3>
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
                        <div className=" descrip-sec">
                            <hr />
                            <h3>Mas detalles</h3>
                            <ul>
                                {amenitiesApi.map(a => <li>{a.tipo}</li>)}
                            </ul>
                        </div>

                        <div className="detalle-ubicacion">
                            <hr />
                            <h3>Ubicacion</h3>
                            <p>{propiedad.ubicacion}</p>
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

                    <div className='detalle-aside'>
                        <section className={fix ? 'sidebar-fixed' : ''}>
                            <div className="precio">
                                <p className='titulo'>Precio <span className='lowercase'>{propiedad.estado}</span></p>
                                {propiedad.publicar_precio ?
                                    <>
                                        <p className='monto'>{`${propiedad.moneda} $${propiedad.precio}`}</p>
                                        {propiedad.estado === 'En alquiler' && <p>Expensas: ${propiedad.expensas}</p>}
                                    </>


                                    :
                                    <p className='monto'>Consultar precio</p>

                                }
                            </div>

                            {propiedad.oficina !== undefined && propiedad.oficina === 'Cordoba 3719' && <Cordoba propiedad={propiedad} />}
                            {propiedad.oficina !== undefined && propiedad.oficina === 'Av. de los Trabajadores 2439' && <Trabajadores propiedad={propiedad} />}
                        </section>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )

}
