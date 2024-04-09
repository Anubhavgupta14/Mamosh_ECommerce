import React from 'react'
import '../../styles/home/video.css'
import ColorPicker from './CustomizationCard/ColorPicker'
import BottleSizeSelector from './CustomizationCard/Sizepicker'
import { CiCircleQuestion } from "react-icons/ci";
import ProductDetails from './ProductDetails'
import RatingWidget from './RatingWidget';

const Landingvideo = () => {
  return (
    <section className='heroSection pb-4'>
      <div className="pt-4 heroMain ">
        <div className=' d-flex mb-4 heroContainer '>
          <div className='stickyTop d-flex align-center heroLeft pt-4'>
            <div className="mainTitle d-flex flex-column justify-between">
              <div className="title">
                <h2 className='mb-4'>Series 2 Flip
                  <span className='muted'>Abyss Gold</span>
                </h2>
                <a href="#">
                  <p className='muted'>Why not try a limited edition Series 2 Bottle and Flip Lid Duo Bundle? </p>
                </a>
              </div>
              <div className='w-25 mt-4 pt-4'>
                <RatingWidget />

              </div>

            </div>
            <div className="heroImg">
              <img src="https://www.datocms-assets.com/11645/1698770169-christmas-gold-and-black-flip-2-1-1.png?q=80&auto=format&dpr=1&w=206&fit=crop" alt="" />
            </div>
          </div>
          <div className='heroRight'>
            <div className="heroCard">
              <div className="card">
                <div className="card-header">
                  <h5>SERIES 2 FLIP</h5>
                </div>
                <div className="card-body">
                  <ColorPicker />
                  <div className="size">
                    <BottleSizeSelector />
                  </div>
                </div>
                <div className="card-footer d-flex justify-between">
                  <h2>
                    ₹380
                  </h2>
                  <button className='btn-primary'>Add to Cart</button>
                </div>
              </div>
              <div className="info-card mt-4 card px-3 py-4" >
                <h6> Get a Free Brush when you spend £60 or more.
                  <span className='ps-1'><CiCircleQuestion /></span>
                </h6>
                <p className="text-muted">
                  Our brush is all-natural and specifically designed to easily clean bottles, cups, food pots and more.
                </p>
              </div>
              <div className="card mt-4 px-3 py-4 productDetailsCard">
                <ProductDetails />
              </div>
              <div className='card mt-4 py-4 px-3'>
                <h4>FREQUENTLY BOUGHT TOGETHER</h4>
                <div className="productCards card d-flex align-center flex-row my-4">
                  <div className="cardImg">
                    <img src="https://www.datocms-assets.com/11645/1607512296-foodpot300stainlesssteel.png?q=80&auto=format&dpr=1&w=130&fit=crop" alt="" />
                  </div>
                  <div className="card-body">
                    <div className="card-description">
                      <h5 className="card-title">
                        FOOD POT: STAINLESS STEEL
                      </h5>
                      <h6 className="card-subtitle">
                        <span>
                          300ml
                        </span>
                        ₹18.00
                      </h6>
                    </div>
                    <button className='btn-primary'>
                      ADD
                    </button>

                  </div>
                </div>
                <div className="productCards card d-flex align-center flex-row my-4">
                  <div className="cardImg">
                    <img src="https://www.datocms-assets.com/11645/1607512296-foodpot300stainlesssteel.png?q=80&auto=format&dpr=1&w=130&fit=crop" alt="" />
                  </div>
                  <div className="card-body">
                    <div className="card-description">
                      <h5 className="card-title">
                        FOOD POT: STAINLESS STEEL
                      </h5>
                      <h6 className="card-subtitle">
                        <span>
                          300ml
                        </span>
                        ₹18.00
                      </h6>
                    </div>
                    <button className='btn-primary'>
                      ADD
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div >
     
    </section >
  )
}

export default Landingvideo