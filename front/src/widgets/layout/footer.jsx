import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function Footer({ brandName, brandLink, routes }) {

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; Agosto 2023, Realizado por: 
          <a
            href="https://github.com/otorres828"
            target="_blank" rel="noreferrer"
            className="transition-colors hover:text-blue-500"
          >
           Oliver Torres V26.269.828
          </a>  
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                rel="noreferrer"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Profesor: Jess Larez",
  brandLink: "https://www.linkedin.com/in/jlarez?originalSubdomain=ve",
  routes: [
    { name: "Profesor: Jesus Larez", path: "https://www.linkedin.com/in/jlarez?originalSubdomain=ve" },
    { name: "Ucab Guayana", path: "https://www.ucab.edu.ve/guayana/" },
    { name: "Informatica", path: "https://ingenieria.ucab.edu.ve/informatica/" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
