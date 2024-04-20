import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const src = "/logo.png";

  return (
    <StyledLogo className="grid justify-center gap-10">
      <Img className="m-auto" src={src} alt="Logo" />
      <span className="uppercase">Aton</span>
    </StyledLogo>
  );
}

export default Logo;
