import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

// import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = () => {
  // console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

Router.onRouteChangeStart = () => {
  // console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()



const Layout = ({children}) => (
    <div>
        <Head>
            <title>BlockPSV</title>
            <meta charSet='utf-8'/>
            <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
            <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
        	{/*-- Place favicon.ico and apple-touch-icon.png in the root directory --*/}
        	<link rel="shortcut icon" href="favicon.ico"/>
        	<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,400italic,700' rel='stylesheet' type='text/css'/>
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
        	{/*-- Animate.css --*/}
        	<link rel="stylesheet" href="/static/css/animate.css"/>
        	{/*-- Icomoon Icon Fonts-->
        	<link rel="stylesheet" href="css/icomoon.css">
        	{/*-- Simple Line Icons --*/}
        	<link rel="stylesheet" href="/static/css/simple-line-icons.css"/>
        	{/*-- Magnific Popup --*/}
        	<link rel="stylesheet" href="/static/css/magnific-popup.css"/>
        	{/*-- Bootstrap  --*/}
        	<link rel="stylesheet" href="/static/css/bootstrap.css"/>
        	<link rel="stylesheet" href="/static/css/flex.css"/>
            <link rel="stylesheet" href="/static/css/react-select.css" />
            <link rel="stylesheet" href="/static/css/react-confirm-alert.css" />
            <link rel="stylesheet" href="/static/css/custom.css" />
            <link rel="stylesheet" href="/static/css/ReactToastify.min.css" />
        	<link rel="stylesheet" href="/static/css/blockpsv.css"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous" />
            {/*
            	1. pink.css
            	2. blue.css
            	3. turquoise.css
            	4. orange.css
            	5. lightblue.css
            	6. brown.css
            	7. green.css
            */}
	        <link rel="stylesheet" href="/static/css/style.css"/>
        	{/*-- amcharts  --*/}
            <script src="/static/amcharts/amstock.js"></script>
            <script src="/static/amcharts/amcharts.js"></script>
            <script src="/static/amcharts/serial.js"></script>
            <script src="/static/amcharts/export.min.js"></script>
            <link rel="stylesheet" href="/static/amcharts/export.css" type="text/css" media="all" />
            <script src="/static/amcharts/patterns.js"></script>
            <script src="/static/js/jquery.min.js"></script>
        </Head>
        <div>
          {children}
        </div>
        <style jsx global>{`
          body {
              background-color: '#f1f1f1' !important;
              color: #3E3C3C !important;
          }
        `}</style>
    </div>
)

Layout.propTypes = {
    children : PropTypes.object,
}

export default Layout;
