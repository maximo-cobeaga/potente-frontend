import React from 'react'

export function PropDestacada({ propiedad }) {
    const { imagenes } = propiedad
    return (
        <div className='prop-destacada'>
            <a href={`/detalle/${propiedad.id}`}>
                <img className='image-prop' src={imagenes[0].imagen} alt="" />
                <div className='image-body'>
                    <div className="image-badge"><span>{propiedad.estado}</span></div>
                    <div className="body-content">

                        {propiedad.publicar_precio ?
                            (<h4>{`${propiedad.moneda} $${propiedad.precio}`}</h4>)
                            :
                            (<h4>Consultar precio</h4>)
                        }
                        <p className='image-description'>{`${propiedad.descripcion.slice(0, 100)}...`}</p>
                        <p className="image-location">{propiedad.ubicacion}</p>
                    </div>
                </div>
            </a>

        </div>
    )

}

