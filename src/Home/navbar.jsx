import Logo from "../assets/images/logo.jpg";

const Navbar=()=>{
    return(
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
          <a class="navbar-brand" href="#">
          <img src={Logo} alt="PharmaGuard Logo" width="50" height="50" />
           <b>PHARMAGUARD</b>
    </a>
  </div>
</nav>
    );
}

export default Navbar;