import React, { useRef, useState, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import { useAuth } from "../../../hooks/auth";
import parse from 'html-react-parser';

import {
  Container2,
  CertificadoMessageContainer,
  OrangeContainer,
} from './styles';

const Certificado: React.FC = () => {
  const [print, setPrint] = useState(false);

var parse = require('html-react-parser');
var a=parse('<img>');

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



      <Container2>
        <h1>

        </h1>
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
                                                                            top: "55%",
                                                                            left: "50%",
                                                                            transform: "translate(-50%, -50%)",
                                                                          }}
                                                                        >
                                                                                      <span>
                                                                                        <p style={{ whiteSpace: 'pre-line' }}>
                                                                                          {user.fullname}, por haver concluído com êxito o Curso Propaga Básico, no ano de 2023
                                                                                          através da Plataforma EAD.
                                                                                        </p>
                                                                                      </span>
                                                                        </div>

                                                                        </div>
    </div>



          </OrangeContainer>
{/*         </CertificadoMessageContainer> */}
      </Container2>
    </>
  );
};

export default Certificado;
