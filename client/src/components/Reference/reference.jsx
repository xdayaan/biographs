import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Modal, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const sources = [
  {
    title: 'NASA Open Science Dataset, OSD-379 (Rodent Research Reference Mission-1)',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-379/',
    description: 'This dataset explores rodent research for space exploration, focusing on understanding the biological effects of space travel on mammals.',
  },
  {
    title: 'NASA Open Science Dataset, OSD-665 (Rodent Research-23 mission)',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-665/',
    description: 'Dataset from the 23rd mission in the Rodent Research series, investigating microgravity\'s impact on animal physiology.',
  },
  {
    title: 'NASA Open Science Data Repository (OSDR)',
    url: 'https://osdr.nasa.gov/',
    description: 'NASA\'s Open Science Data Repository for publicly accessible scientific datasets across various space missions.',
  },
  {
    title: 'Biological and Physical Sciences (BPS) Explainers',
    url: 'https://www.nasa.gov/missions/station/iss-research/biological-and-physical-sciences-explainers/',
    description: 'Learn about the biological and physical sciences conducted aboard the International Space Station (ISS).',
  },
  {
    title: 'Effects of Spaceflight on Mouse Physiology - NASA GeneLab Platform',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7230383/',
    description: 'A study on how spaceflight affects mouse physiology using NASA\'s open access GeneLab platform.',
  },
  {
    title: "European Space Agency's Planetary Science Archive",
    url: 'https://archives.esac.esa.int/psa/',
    description: 'The European Space Agency\'s archive of planetary science missions, offering open access to mission data.',
  },
  {
    title: 'Canadian Space Agency - Effects of Space on the Human Body',
    url: 'https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/physical-effects-of-living-in-space.asp/',
    description: 'An overview of how space travel impacts the human body, from bone density loss to muscle atrophy.',
  },
  {
    title: 'Canadian Science on the International Space Station',
    url: 'https://www.asc-csa.gc.ca/eng/sciences/experiments/default.asp/',
    description: 'A collection of Canadian experiments conducted aboard the International Space Station (ISS).',
  },
];

const ReferenceCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);

  const handleOpen = (source) => {
    setSelectedSource(source);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Typography variant="h4" component="h2" className="text-center mb-8 font-extrabold text-gray-800">
        Space Research and Data Sources
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 cursor-pointer rounded-lg overflow-hidden"
            onClick={() => handleOpen(source)}
          >
            <CardContent className="bg-gradient-to-r from-[#719DC0] to-[#CCD1CA] p-4">
              <Typography variant="h6" component="div" className="text-white font-semibold">
                {source.title}
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: '#154972', color: '#FFFFFF' }} // Updated colors
                endIcon={<LaunchIcon />}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm hover:bg-[#0F3A5D] transition-all duration-300" // Darker shade on hover
              >
                View Source
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for more details */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" className="text-gray-800 mb-2">
            {selectedSource?.title}
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-3">
            {selectedSource?.description}
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: '#154972', color: '#FFFFFF' }} // Updated colors
            endIcon={<LaunchIcon />}
            href={selectedSource?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:bg-[#0F3A5D] transition-all duration-300" // Darker shade on hover
          >
            Go to Source
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ReferenceCard;
