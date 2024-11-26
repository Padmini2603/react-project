import { motion } from "framer-motion";
import Header from "./Header";

const Explore = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        staggerChildren: 0.3, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <Header />
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ padding: "20px", textAlign: "center" }}
      >
        <motion.h1 variants={cardVariants}>Explore</motion.h1>
        <motion.p variants={cardVariants}>
          Discover a world of endless possibilities. Dive into our curated
          content and explore topics that interest you the most.
        </motion.p>
        <motion.section
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <motion.div
            variants={cardVariants}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              width: "200px",
            }}
          >
            <h2>Category 1</h2>
            <p>Explore amazing articles and insights in this category.</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              width: "200px",
            }}
          >
            <h2>Category 2</h2>
            <p>Discover the latest trends and updates in this field.</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              width: "200px",
            }}
          >
            <h2>Category 3</h2>
            <p>Find resources and inspiration tailored for you.</p>
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default Explore;
