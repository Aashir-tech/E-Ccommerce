import React from 'react'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/Appstore.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer id = "footer">
        <div className='leftFooter'>
            <h4>Download Our App</h4>
            <p className='leftFooterPara'>Download App for Android and IOS mobile Phone</p>
            <img src={playstore} alt='playstore' />
            <img src={appstore} alt='appstore' />
        </div>

        <div className='midFooter'>
            <h1>ESTORE</h1>
            <p>Selling the best quality with large audience</p>
            <p>Copyrights 2024 &copy; AashirHaris</p>
        </div>

        <div className='rightFooter'>
            <h4>TRACK US</h4>
            <a href='http://linkedin.com/aashir'>Instragram</a>
            <a href='http://facebook.com/aashir'>Facebook</a>
            <a href='http://youtube.com/aashir'>Youtube</a>
        </div>

    </footer>
  )
}

export default Footer