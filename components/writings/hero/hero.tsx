import { 
  BorderedButton,
  GreyOneMedium, 
  MainButton, 
  SignedHeading, 
  SignedHero } from "@/styled/shared/collection";
import Link from "next/link";
import { ControlContainer } from "./hero.styled";


const Hero = () => {

  return (
    <SignedHero>
      <SignedHeading>Writings</SignedHeading>
      <GreyOneMedium>Write your own article or collaborate with other writers</GreyOneMedium>
      <ControlContainer>
        <Link
          href="/write"
          passHref>
          <MainButton as="a">Create article</MainButton>
        </Link>
        <BorderedButton>Collaborate</BorderedButton>
      </ControlContainer>
    </SignedHero>
  );
}


export default Hero;