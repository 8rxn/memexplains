import React from "react";
import {
  ArrowDownIcon,
  ServerIcon,
  ImageIcon,
  TextIcon,
  DollarSignIcon,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

type FlowStepProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FlowStep: React.FC<FlowStepProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="flex flex-col items-center p-4 bg-slate-100 rounded-lg shadow-md">
    <Icon className="w-12 h-12 text-blue-500 mb-2" />
    <h3 className="text-lg dark:text-gray-900 font-semibold mb-1">{title}</h3>
    <p className="text-sm text-center dark:text-gray-700">{description}</p>
  </div>
);

const Arrow: React.FC = () => (
  <div className="flex justify-center my-4">
    <ArrowDownIcon className="w-8 h-8" />
  </div>
);

type StepData = {
  icon: LucideIcon;
  title: string;
  description: string;
  extraContent?: React.ReactNode;
};

type MemeGeneratorFlowProps = {
  steps: StepData[];
};

const MemeGeneratorFlow: React.FC<MemeGeneratorFlowProps> = ({ steps }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-8 text-center">
        How Our Meme Generator Works
      </h1>
      <p className="text-xs my-2">
        <strong>P.S.</strong>This explains the standard flow when user's api key is not provided. In
        case that is provided,{"\n"}
        We use the user's credits to generate the meme.
      </p>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <FlowStep
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
            {step.extraContent && (
              <div className="rounded-xl border border-dashed p-2  border-gray-400 dark:border-gray-800">
                {step.extraContent}
              </div>
            )}
            {index < steps.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const stepsData: StepData[] = [
  {
    icon: ServerIcon,
    title: "1. Request Handling",
    description:
      "Receives user input and API key, validates the request, and checks user credits.",
    extraContent: (
      <p>
        <strong>Input:</strong> Ferrari suing people for mods in their cars.
      </p>
    ),
  },
  {
    icon: TextIcon,
    title: "2. OpenAI Prompt Generation",
    description:
      "Uses GPT-4 to create a meme concept based on the user's input.",
    extraContent: (
      <>
        <p>
          <strong>Diffusion Prompt:</strong> Something like A ferarri lawyer
          lord standing in court for justice over people modding there cars
        </p>
        <p>
          <strong>Caption:</strong>When you just wanted cooler rims but now you
          have to explain yourself in court #FerrariModSquad
        </p>
      </>
    ),
  },
  {
    icon: ImageIcon,
    title: "3. DALL-E Image Creation",
    description: "Generates an image based on the GPT-4 prompt using DALL-E 3.",
    extraContent: (
      <Image
        src="https://memes-cdn.rajaryan.work/uploads/52-ferrari-suing-people-for-mods-in-their-cars.webp"
        width={200}
        height={200}
        className="mx-auto w-[200px] h-[180px] object-bottom object-cover "
        alt="Generated Meme"
      />
    ),
  },
  {
    icon: ImageIcon,
    title: "4. Image Processing",
    description:
      "Combines the generated image with the subtitle text using canvas.",
    extraContent: (
      <Image
        src="https://memes-cdn.rajaryan.work/uploads/52-ferrari-suing-people-for-mods-in-their-cars.webp"
        width={300}
        height={300}
        className="mx-auto "
        alt="Processed Meme"
      />
    ),
  },
  {
    icon: ServerIcon,
    title: "5. Storage and Response",
    description:
      "Uploads the meme to storage, updates the database, and sends the result to the user.",
    extraContent: (
      <>
        <p>
          <strong>Storage:</strong> A Cloudflare R2 Bucket stores the memes.
        </p>
        <p>
          <strong>Response:</strong> The request responds with the generated
          meme.
        </p>
      </>
    ),
  },
  {
    icon: DollarSignIcon,
    title: "6. Cost Calculation",
    description:
      "Calculates and reports the cost of meme generation, including API usage.",
    extraContent: (
      <p>
        <strong>Cost:</strong> Calculated based on text tokens and image size.
      </p>
    ),
  },
];

export default function App() {
  return <MemeGeneratorFlow steps={stepsData} />;
}
