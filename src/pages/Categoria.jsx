import React, { useContext, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useParams, useSearchParams } from 'react-router-dom'
import { PropiedadCatalogo } from '../components/PropiedadCatalogo'
import { Fragment } from 'react'
import Media from 'react-media';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { obtenerPropiedades, obtenerTipos } from '../api/propiedadesAPI'
import { useForm } from 'react-hook-form'


export function Categoria() {
    const [propiedades, setPropiedades] = useState([])
    const [tipos, setTipos] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const params = useParams()
    const { register, handleSubmit } = useForm()


    //Parametros de busqueda por filtro usando querys

    const [searchParams, setSearchParams] = useSearchParams()

    const busqueda = searchParams.get('busqueda')
    const tipo = searchParams.get('tipo')
    const moneda = searchParams.get('moneda')
    const desde = searchParams.get('desde')
    const hasta = searchParams.get('hasta')
    const dormitorios = searchParams.get('dormitorios')
    const baños = searchParams.get('baños')

    const onChange = data => {
        console.log(data.target.name + ": " + data.target.value)
    }

    const handleChange = e => {
        setSearchParams({ busqueda: e.target.value, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: dormitorios, baños: baños })
    }



    useEffect(() => {
        async function cargarPropiedades() {
            const { data } = await obtenerPropiedades()
            let resultado

            if (params.cat === 'venta') {
                resultado = data.filter(prop => prop.estado === 'En venta')
            } else if (params.cat === 'alquiler') {
                resultado = data.filter(prop => prop.estado === 'En alquiler')
            } else if (params.cat === 'temporal') {
                resultado = data.filter(prop => prop.estado === 'En alquiler temporal')
            }

            if (busqueda !== null) {
                console.log(busqueda)
                console.log(resultado)
                console.log(resultado[0].descripcion.toLowerCase().includes(busqueda))
                resultado.filter(p => p.descripcion.toLowerCase().includes(busqueda))
            }
            if (tipo !== null) {

            }
            if (moneda !== null) {

            }
            if (dormitorios !== null) {

            }
            if (baños !== null) {

            }

            setPropiedades(resultado)

        }

        async function cargarTipos() {
            const { data } = await obtenerTipos()
            setTipos(data)
        }

        cargarPropiedades()
        cargarTipos()
    }, [])

    function onSearch() {
        window.location.reload()
    }



    return (
        <>
            <Media queries={{
                small: "(max-width: 599px)",
                medium: "(min-width: 600px)"
            }}>
                {matches => (
                    <Fragment>
                        {matches.small &&
                            <>
                                <Navbar modal={show} />
                                <section className='categoria-container-sm'>
                                    <div className='categoria-filtros-sm'>
                                        <button onClick={handleShow} >Filtros</button>
                                        <form>
                                            <input className='input-t' type="text" placeholder='Palabras clave...' />
                                            <input className='input-b' type="button" value="Buscar" />
                                        </form>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Filtros</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className='aside-lista-sm'>
                                                <p className='titulo-sm'>Ubicacion</p>
                                                <ul>
                                                    <li>Centro</li>
                                                    <li>chauvin</li>
                                                    <li>guemes</li>
                                                    <li>la perla</li>
                                                    <li>la perla norte</li>
                                                    <li>los troncos</li>
                                                    <li>playa chica</li>
                                                    <li>playa grande</li>
                                                    <li>plaza mitre</li>
                                                    <li>san carlos</li>
                                                </ul>
                                            </div>
                                            <hr />
                                            <form className="aside-precio-sm">
                                                <p className='titulo-sm'>Precio</p>
                                                <div>
                                                    <select>
                                                        <option value="usd">USD</option>
                                                        <option value="ars">ARS</option>
                                                    </select>
                                                    <input type="number" placeholder='Desde' />
                                                    <input type="number" placeholder='Hasta' />

                                                </div>
                                                <input className='button-submit' type="submit" />
                                            </form>
                                            <hr />
                                            <form className='aside-superficie-sm'>
                                                <p className='titulo-sm'>Superficie total</p>
                                                <div>
                                                    <div>
                                                        <label>Desde</label>
                                                        <input type="number" placeholder='Desde' />
                                                    </div>
                                                    <div>
                                                        <label>Hasta</label>
                                                        <input type="number" placeholder='Hasta' />
                                                    </div>
                                                </div>

                                            </form>
                                            <hr />
                                            <div className='aside-botones-sm'>
                                                <p className='titulo-sm'>Dormitorios</p>
                                                <div>
                                                    <button>0</button>
                                                    <button>1</button>
                                                    <button>2</button>
                                                    <button>3</button>
                                                    <button>4+</button>
                                                </div>

                                            </div>
                                            <hr />
                                            <div className='aside-botones-sm'>
                                                <p className='titulo-sm'>Baños</p>
                                                <div>
                                                    <button>0</button>
                                                    <button>1</button>
                                                    <button>2</button>
                                                    <button>3</button>
                                                    <button>4+</button>
                                                </div>

                                            </div>
                                            <hr />

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div className='categoria-catalogo-sm'>
                                        {propiedades.map(p => <PropiedadCatalogo key={p.id} propiedad={p} />)}
                                    </div>
                                </section>
                                <Footer />
                            </>
                        }
                        {matches.medium &&
                            <>
                                <Navbar />
                                <section className='categorias-section'>
                                    {/* <h1>{`busqueda: ${busqueda} - tipo: ${tipo} - moneda: ${moneda} - desde: ${desde} - hasta: ${hasta} - dormitorios: ${dormitorios} - baños: ${baños}`}</h1> */}
                                    <div className='categorias-container'>
                                        <aside className='categorias-aside'>
                                            <button onClick={onSearch} className='filtros-button'>realizar busqueda</button>
                                            <form className='aside-busqueda'>
                                                <label>Palabras Clave</label>
                                                <div>
                                                    <input type="text" placeholder='Ingrese una palabra clave' onChange={e => handleChange(e)} />
                                                </div>

                                            </form>
                                            <hr />
                                            <div className='aside-lista'>
                                                <p>Tipo de propiedad</p>
                                                <select className='tipo' onChange={(e) => setSearchParams({ busqueda: busqueda, tipo: e.target.value, moneda: moneda, desde: desde, hasta: hasta, dormitorios: dormitorios, baños: baños })}>
                                                    {tipos !== undefined && tipos.map(t => <option value={t.id} key={t.id}  >{t.tipo}</option>)}

                                                </select>
                                            </div>
                                            <hr />
                                            <form className="aside-precio">
                                                <p>Precio</p>
                                                <div>
                                                    <select onChange={e => setSearchParams(
                                                        { busqueda: busqueda, tipo: tipo, moneda: e.target.value, desde: desde, hasta: hasta, dormitorios: dormitorios, baños: baños }
                                                    )}>
                                                        <option value="usd">USD</option>
                                                        <option value="ars">ARS</option>
                                                    </select>
                                                    <input onChange={e => setSearchParams(
                                                        { busqueda: busqueda, tipo: tipo, moneda: moneda, desde: e.target.value, hasta: hasta, dormitorios: dormitorios, baños: baños }
                                                    )} type="number" placeholder='Desde' />
                                                    <input onChange={e => setSearchParams(
                                                        { busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: e.target.value, dormitorios: dormitorios, baños: baños }
                                                    )} type="number" placeholder='Hasta' />
                                                </div>
                                            </form>
                                            <hr />
                                            <div className='aside-botones'>
                                                <p>Dormitorios</p>
                                                <div>
                                                    <button onClick={() => setSearchParams({ busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: 1 })}>1</button>
                                                    <button onClick={() => setSearchParams({ busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: 2 })}>2</button>
                                                    <button onClick={() => setSearchParams({ busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: 3 })}>3</button>
                                                    <button onClick={() => setSearchParams({ busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: 4 })}>4+</button>
                                                </div>

                                            </div>
                                            <hr />
                                            <div className='aside-botones'>
                                                <p>Baños</p>
                                                <div>
                                                    <button onClick={() => setSearchParams({ busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: dormitorios, baños: 1 })}>1</button>
                                                    <button onClick={() => setSearchParams({ busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: dormitorios, baños: 2 })}>2</button>
                                                    <button onClick={() => setSearchParams({ busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: dormitorios, baños: 3 })}>3</button>
                                                    <button onClick={() => setSearchParams({ busqueda: busqueda, tipo: tipo, moneda: moneda, desde: desde, hasta: hasta, dormitorios: dormitorios, baños: 4 })}>4+</button>
                                                </div>

                                            </div>

                                        </aside>
                                        <div className='categorias-catalogo'>
                                            {propiedades.map(p =>
                                                <PropiedadCatalogo key={p.id} propiedad={p} />)}
                                        </div>
                                    </div>
                                </section>
                                <Footer />
                            </>
                        }
                    </Fragment>
                )}
            </Media>




        </>
    )
}
