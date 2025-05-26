"use client";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const TextAnswersComponent = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-gray-950 lg:px-24 mb-6"
    >
      <AccordionItem value="question-1">
        <AccordionTrigger className="text-lg font-semibold">
          1. Que regra utilizou para calcular a distância aproximada do rosto
          até a câmera?
        </AccordionTrigger>

        <AccordionContent>
          <div className="prose prose-invert max-w-none">
            <p>
              Inicialmente, me baseei no princípio da perspectiva linear, onde
              objetos mais distantes aparecem menores na imagem. Utilizei a
              relação inversa entre o tamanho aparente do rosto e sua distância
              real.
            </p>

            <p className="pt-2">A fórmula implementada foi:&nbsp;</p>

            <code className="font-semibold">
              distância = constante_de_calibração / largura_do_rosto_em_pixels
            </code>

            <p className="pt-2">
              A constante é calculada através de calibração, onde o usuário se
              posiciona a uma distância conhecida (ex: 1,5m), permitindo o
              cálculo:&nbsp;
            </p>

            <code className="font-semibold">
              constante = distância_conhecida × largura_pixels_referência
            </code>

            <p className="pt-2">
              É possível realizar a calibragem diretamente na aplicação.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="question-2">
        <AccordionTrigger className="text-lg font-semibold">
          2. Qual o trigger ou regra adotada para executar um registro detecções
          no Firebase?
        </AccordionTrigger>
        <AccordionContent>
          <div className="prose prose-invert max-w-none">
            <p>
              O registro no Firebase é salvo com base em duas verificações
              principais.
            </p>

            <ol className="list-decimal pl-6 my-2">
              <li>
                Primeiro, o sistema se a face detectada é nova ou já conhecida.
                Se for uma face nova, registramos imediatamente.
              </li>
              <li>
                Em seguida, se a face já é conhecida, checamos se passou tempo
                suficiente desde o último registro dessa mesma pessoa. O sistema
                mantém um controle de quando cada pessoa foi vista pela última
                vez e só registra novamente se o intervalo configurado tiver
                passado.
              </li>
            </ol>

            <p className="font-semibold">
              O usuário pode definir esse intervalo de tempo através da
              interface. Se o intervalo for zero, rostos ja detectados não serão
              registrados novamente.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="question-3">
        <AccordionTrigger className="text-lg font-semibold">
          3. Explique claramente qual o critério adotado para evitar contagens
          repetidas?
        </AccordionTrigger>
        <AccordionContent>
          <div className="prose prose-invert max-w-none">
            <p>
              Implementei um sistema de identificação baseado em vetores
              faciais. Utilizei a biblioteca{" "}
              <a
                href="https://docs.turso.tech/sdk/ts/quickstart"
                className="italic font-semibold underline"
                target="_blank"
              >
                libSQL
              </a>{" "}
              que possui a extensão para armezenamento de vetores em bancos
              SQLite. A biblioteca <i>face-api.js</i> já fornece o campo{" "}
              <code className="font-semibold">descriptor</code> com vetores da
              face detectada.
            </p>

            <p className="pt-2">
              Persistimos esses vetores e consultamos o banco de dados para
              buscar faces similares através do cálculo de{" "}
              <a
                href="https://docs.turso.tech/features/ai-and-embeddings#understanding-distance-results"
                className="italic font-semibold underline"
                target="_blank"
              >
                distância vetorial
              </a>{" "}
              entre os valores.
            </p>

            <p className="pt-2">
              Quando uma nova face é detectada, a comparamos com as faces
              existentes usando um threshold de similaridade configurável.
            </p>

            <p>
              Se a distância vetorial for inferior ao threshold, consideramos a
              face como já conhecida e não registramos novamente, evitando assim
              contagens duplicadas da mesma pessoa.
            </p>

            <p className="pt-2">
              Para faces conhecidas, há um controle de intervalo que define
              quando a mesma pessoa pode ser registrada novamente. Se o
              intervalo for definido como{" "}
              <code className="font-semibold">zero</code> (default), faces
              conhecidas não são registradas novamente, funcionando como um
              bloqueio total de duplicatas.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
