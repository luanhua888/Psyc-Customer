import Navbar from './navbar';

export default function Layout({ children }) {
    return (
        <>
            <Navbar className ="fixed top-0" />
            <main>{children}</main>
        </>
    );
}
