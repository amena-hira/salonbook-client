import Footer from '@/components/shared/footer/footer';
import Navbar from '@/components/shared/navbar/navbar';
import React from 'react';

const ServicePageLayout = ({children}) => {
    return (
        <>
        <Navbar/>
        <main>
            {children}
        </main>
        <Footer/>
            
        </>
    );
};

export default ServicePageLayout;