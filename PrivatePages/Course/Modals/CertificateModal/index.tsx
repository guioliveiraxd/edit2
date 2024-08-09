import React, { useRef, useState, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import { useAuth } from "../../../../../hooks/auth";
import parse from 'html-react-parser';
import { CourseSeasonMovie, Course } from "../../../../../models/CourseModels";

import imageSIM from "../../../../../assets/images/certificate/SIM.png";

import {
  Container,
  CertificadoMessageContainer,
  OrangeContainer,
} from './styles';

interface CertificateModalProps {
//   isAddingNote?: boolean;
//   actualTime: {
//     playedSeconds: number;
//     played: number;
//     loadedSeconds: number;
//     loaded: number;
//   };
//   addNoteInputRef: Ref<HTMLInputElement>;
  setShowCertificate(state: boolean): void;
  courseDetails?: Course;
//   setIsPlaying(state: boolean): void;
//   handleAddNote(action: string): void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
                                                          setShowCertificate,
                                                          courseDetails,
                                                        }) => {

  const [print, setPrint] = useState(false);

// var parse = require('html-react-parser');
// var a=parse('<img>');

let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

  const { user } = useAuth();
//   const { team } = useTeam();

  const certificateRef = useRef(null);

  const printer = useReactToPrint({
    content: () => certificateRef.current,
  });
  const handlePrint = useCallback(() => {
    setPrint(true);
    printer && printer();
  }, [printer]);

  return (
    <>



      <Container>
        <h1>

        </h1>

        <button
                                                                                   className="forgot"
                                                                                   type="button"
                                                                                   onClick={() => setShowCertificate(false)}
                                                                                 >
                                                                                   Fechar
                                                                                 </button>


        <FiPrinter onClick={handlePrint} size={40} color="#0c0c0c" />
{/*         <CertificadoMessageContainer ref={certificateRef}> */}
         <OrangeContainer ref={certificateRef} print={print}>



<div
      style={{
        alignItems: "center",margin: "0px auto",
                                                              display: "flex",
                                                              flexWrap: "wrap",
                                                          height: "100%",
                                                          width: "100%"
      }}
    >
     {courseDetails!.schoolid==="SIM" && (
      <div style={{             margin: "0px auto",
                                       display: "flex",
                                       flexWrap: "wrap",
                                   height: "100%",
                                   width: "100%",
                                   backgroundImage:
                                   'url("https://nl-files.s3.sa-east-1.amazonaws.com/certificados/sim/certificado_sim_v1.png")',
                                   backgroundSize: "contain",
                                   backgroundRepeat: "no-repeat",}}>

                                   <div
                                                                          style={{
                                                                            position: "absolute",
                                                                             width: "71%",
                                                                            top: "57%",
                                                                            left: "50%",
                                                                            transform: "translate(-50%, -50%)",
                                                                          }}
                                                                        >
                                                                                      <span>
                                                                                        <p style={{ whiteSpace: 'pre-line' }}>
                                                                                          {user.fullname}, por haver concluído com êxito o curso {courseDetails!.title!},
                                                                                          com carga horária de {courseDetails!.totalhours!} {courseDetails!.totalhours! > 1 ? "horas ":"hora "}
                                                                                          através da Plataforma EAD.
                                                                                        </p>
                                                                                      </span>
                                                                        </div>

                                                                        </div>

                                                                        )}
    </div>



          </OrangeContainer>
{/*         </CertificadoMessageContainer> */}
 <span>
                                                                                        <p style={{ whiteSpace: 'pre-line' }}>

                                                                                        </p>
                                                                                      </span>
      </Container>
    </>
  );
};

export default CertificateModal;
