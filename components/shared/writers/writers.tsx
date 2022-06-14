import { writerFullName } from "@/lib/utils";
import { Writer as WriterType } from "@/store/tracked";
import Link from "next/link";
import { 
  Bio,
  Heading, 
  Image, 
  Name, 
  Wrapper, 
  Writer, 
  WriterList } from "./writers.styled"


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
          <Writer key={ writer.searchId }>
            <div>
              <Image 
                src={ writer.image }
                alt={ writerFullName(writer) } />
            </div>
            <div>
              <Link
                href={ `/writer/${ writerFullName(writer, false).toLowerCase() }` }
                passHref>
                  <Name>{ writerFullName(writer) }</Name>
              </Link>
            </div>
            <Bio>{ writer.bio }</Bio>
          </Writer>
        )) }
      </WriterList>
    </Wrapper>
  );
}


export default Writers;