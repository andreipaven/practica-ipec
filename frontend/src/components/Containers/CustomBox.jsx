import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function CustomBox({
  //motion
  animateOnScroll = false,
  animateOnLoad = false,
  animationPreset,
  initial = { opacity: 0, y: 50 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  viewport = { once: true, amount: 0.2 },
  //styles
  alignItems,
  gap,
  backgroundImage,
  minHeight,
  maxWidth,
  color,
  children,
  maxHeight,
  padding,
  flexDirection,
  flexWrap,
  gridTemplateColumns,
  display,
  width,
  justifyContent,
  height,
  backgroundColor,
  zIndex,
  className,
  ...rest
}) {
  const animInitial = animationPreset?.initial || initial;
  const animWhileInView = animationPreset?.whileInView || whileInView;
  return (
    <MotionBox
      {...(animateOnScroll && {
        initial: animInitial,
        whileInView: animWhileInView,
        transition,
        viewport,
      })}
      {...(animateOnLoad && {
        initial: animInitial,
        animate: animWhileInView,
        transition,
      })}
      {...(!animateOnScroll &&
        !animateOnLoad && {
          initial: undefined,
          animate: undefined,
        })}
      className={className}
      sx={{
        backgroundImage: backgroundImage || "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: minHeight,
        width: width || "100%",

        maxWidth: maxWidth,
        display: display || "flex",
        flexDirection: flexDirection || "column",
        justifyContent: justifyContent || "center",
        alignItems: alignItems || "center",
        padding: padding || "0em",
        color: color,
        gap: gap || 0,
        height: height || "100%",
        maxHeight: maxHeight,
        flexWrap: flexWrap,
        gridTemplateColumns: gridTemplateColumns,
        backgroundColor: backgroundColor,
        zIndex: zIndex,
        ...rest,
      }}
    >
      {children}
    </MotionBox>
  );
}

export default React.memo(CustomBox);
