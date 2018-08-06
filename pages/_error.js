import React from 'react';
import Layout from '../modules/core/components/Layout';
import Link from 'next/link';

export default () => (
  <Layout>
      <section id="fh5co-home" data-section="home" data-stellar-background-ratio="0.5">
          <div className="gradient"></div>
          <div className="container">
              <div className="text-wrap">
                  <div className="text-inner">
                      <div className="row">
                          <div className="col-md-8 col-md-offset-2">
                              <h1 className="to-animate h1-404">404</h1>
                              <h2 className="to-animate">Sorry. Page Not Found!</h2>
                              <h2 className="to-animate"></h2>
                              <Link prefetch href="/">
                                <div className="home-button ">
                                    <i className="fas fa-home"></i>
                                    <p className="go-back-home">Go Back Home</p>
                                </div>
                              </Link>
                          </div>
                      </div>
                    
                  </div>
              </div>
          </div>
      </section>
        <style jsx global>{`
            .h1-404{
              margin-bottom: 0px !important;
            }
            .home-button{
                font-size: 68px;
                margin-top: 20px;
            }
            .home-button:hover{
              cursor: pointer;
            }
            .go-back-home{
                font-size: 20px;
            }
        `}</style>
  </Layout>
)
