import { 
  Bio,
  Heading, 
  Image, 
  Name, 
  Wrapper, 
  Writer, 
  WriterList } from "./writers.styled"
import { writerFullName } from "@/lib/utils";
import { Writer as WriterType } from "@/store/tracked";
import Link from "next/link";


interface WriterProps {
  children: React.ReactNode,
  writers: WriterType[]
}

const Writers = ( {
  children,
  writers
}: WriterProps ) => {

  return (
    <Wrapper>
      <Heading>{ children }</Heading>
      <WriterList>
        { writers.map(writer => (
          <Writer key={ writer.username }>
            <div>
              <Image 
                src={ writer.image?? "/icons/default-avatar.svg" }
                alt={ writerFullName(writer) } />
            </div>
            <div>
              <Link
                href={ `/writer/${ writerFullName(writer, false).toLowerCase() }` }
                passHref>
                  <Name>{ writerFullName(writer) }</Name>
              </Link>
            </div>
            <Bio>{ writer.bio? writer.bio : "A mysterious individual who has yet to fill out their bio. One thing's for sure. I love writing." }</Bio>
          </Writer>
        )) }
      </WriterList>
    </Wrapper>
  );
}


export default Writers;