import React, { Fragment, useEffect, useState } from 'react'
import Media from 'react-media';
import { useNavigate } from 'react-router-dom'
import { CordobaSm } from '../components/CordobaSm'
import { TrabajadoresSm } from '../components/TrabajadoresSm'

export function PropiedadCatalogo({ propiedad }) {
    const Navigate = useNavigate()
    const { imagenes } = propiedad
    const { titulo_propiedad } = propiedad
    const { ficha } = propiedad
    const { oficina } = propiedad
    let numero = ''
    if (oficina !== undefined && oficina === 'Cordoba 3719') {
        numero = '2234727416'
    } else {
        numero = '2234840619'
    }

    return (


        <Media queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px)"
        }}>
            {matches => (
                <Fragment>
                    {matches.small &&
                        <a target='_blank' className="categoria-propiedad-sm" href={`/detalle/${propiedad.id}`}>
                            <div className='propiedad-imagen-sm'>
                                <img src={imagenes[0].imagen} alt={propiedad.titulo} />
                                <div className='categoria-badge-sm'><span>{propiedad.estado}</span></div>
                            </div>
                            <div className='propiedad-body-sm'>
                                <h3>{propiedad.titulo}</h3>
                                <p className='propiedad-ubi-sm'>{propiedad.ubicacion}</p>
                                <p>{propiedad.descripcion}</p>
                                {propiedad.publicar_precio ?
                                    <p className='propiedad-precio-sm'>{`${propiedad.moneda} $${propiedad.precio}`}</p>
                                    :
                                    <p className='propiedad-precio-sm'>Consultar precio</p>

                                }
                                {propiedad.oficina === 'Cordoba 3719' ?

                                    <CordobaSm propiedad={propiedad} />
                                    :
                                    <TrabajadoresSm propiedad={propiedad} />

                                }
                            </div>
                        </a>
                    }
                    {matches.medium &&
                        <a target='_blank' className='categoria-propiedad' href={`/detalle/${propiedad.id}`}>
                            <div className='categoria-propiedad-imagen'>
                                <img src={imagenes[0].imagen} alt="" />
                                <div className='cate-badge'><span>{propiedad.estado}</span></div>
                            </div>

                            <div className="categoria-propiedad-body">
                                <h4>{propiedad.titulo_propiedad}</h4>
                                <p>{propiedad.ubicacion}</p>
                                <p>{propiedad.descripcion}</p>
                                {propiedad.publicar_precio === true ?
                                    <p className='precio'>{`${propiedad.moneda} $${propiedad.precio}`}</p>
                                    :
                                    <p className='precio'>Consultar precio</p>
                                }
                                <div className="bottom">
                                    <p><strong>Oficina: </strong> {propiedad.oficina}</p>
                                    <div className="propiedad-botones">
                                        <a target='_blank' className='btn' href={`/detalle/${propiedad.id}`}>Ver mas</a>
                                        {oficina !== undefined && (
                                            <a target='_blank' href={`https://api.whatsapp.com/send?phone=${numero}&text=%C2%A1Hola!%20quiero%20informacion%20sobre%20la%20propiedad%3A%20${titulo_propiedad !== undefined && titulo_propiedad.replaceAll(' ', '%20')}.%20(Id%3A%20${ficha !== undefined && ficha})`} className='btn bg-green'><svg style={{ fill: 'white' }} xmlns="http://www.w3.org/2000/svg" height="18" width="16" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg> Escribinos por whatsapp</a>

                                        )}

                                    </div>
                                </div>
                            </div>
                        </a>
                    }
                </Fragment>
            )}
        </Media>




    )
}
