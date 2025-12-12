//hiệu ứng croll------

document.addEventListener('DOMContentLoaded', function() {
        console.log('Project showcase script loaded');
        const container = document.getElementById('projects-container');
        const cards = document.querySelectorAll('.project-card');
        const section = document.querySelector('#desktop-projects');
        
        console.log('Container:', container);
        console.log('Cards:', cards);
        console.log('Section:', section);
        
        // Get element position relative to viewport
        function getElementPosition(el) {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          // Calculate how much of the element is visible in the viewport (0 to 1)
          const elementTop = rect.top;
          const elementBottom = rect.bottom;
          const visibleHeight = Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0);
          const elementHeight = rect.height;
          
          if (elementHeight <= 0) return 0;
          
          // Return percentage of element visible (0 to 1)
          return Math.max(0, Math.min(1, visibleHeight / elementHeight));
        }
        
        // Update card positions based on scroll progress
        function updateCardPositions(progress) {
          // Clamp progress between 0 and 1
          progress = Math.max(0, Math.min(1, progress));
          
          // Smooth easing function for natural movement
const easedProgress = Math.pow(progress, 2.5); 
          
          // Define target positions for each card
          const targets = [
  { rotate: 0, translateX: -60, translateY: 0, zIndex: 10 },
  { rotate: 0, translateX: 0, translateY: 0, zIndex: 11 },
  { rotate: 0, translateX: 60, translateY: 0, zIndex: 10 }
];
          
          // Define initial stacked positions
          const initials = [
            { rotate: -10, translateX: 0, translateY: 0, zIndex: 3 },
            { rotate: -6, translateX: 0, translateY: 0, zIndex: 2 },
            { rotate: 0, translateX: 0, translateY: 0, zIndex: 1 }
          ];
          
          // Interpolate between initial and target positions
          cards.forEach((card, index) => {
            const initial = initials[index];
            const target = targets[index];
            
            // Calculate interpolated values
            const rotate = initial.rotate + (target.rotate - initial.rotate) * easedProgress;
            const translateX = initial.translateX + (target.translateX - initial.translateX) * easedProgress;
            const translateY = initial.translateY + (target.translateY - initial.translateY) * easedProgress;
            
            // Apply transform
            card.style.transform = `rotate(${rotate}deg) translateX(${translateX}px) translateY(${translateY}px)`;
            
            // Apply glow effect based on progress
            if (progress > 0.1) {
              const glowIntensity = Math.min(1, progress * 1.5);
              const baseShadows = [
                'rgba(0, 0, 0, 0.1) 0px 25px 25px',
                'rgba(0, 0, 0, 0.1) 0px 25px 25px',
                'rgba(0, 0, 0, 0.1) 0px 25px 25px'
              ];
              
              // Remove the green neon glow effect
              card.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 25px 25px';
            } else {
              card.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 25px 25px';
            }
            
            // Update z-index gradually
            const zIndex = Math.round(initial.zIndex + (target.zIndex - initial.zIndex) * easedProgress);
            card.style.zIndex = zIndex.toString();
          });
        }
        
        // Scroll event listener with throttling
        let ticking = false;
        function handleScroll() {
          if (!ticking) {
            requestAnimationFrame(() => {
              const progress = getElementPosition(section);
              updateCardPositions(progress);
              ticking = false;
            });
            ticking = true;
          }
        }
        
        // Initialize cards in stacked position
        updateCardPositions(0);
        
        // Listen for scroll events
        window.addEventListener('scroll', handleScroll);
        
        // Also check on load in case the element is already in view
        handleScroll();
        
        console.log('Project showcase scroll animation initialized');
      });


// kỹ năng mềm //

document.addEventListener('DOMContentLoaded', function() {
      console.log('Soft skills animation script loaded');
      // Set up canvas for neon lines
      const canvas = document.getElementById('neon-lines');
      const ctx = canvas.getContext('2d');
      
      console.log('Canvas:', canvas);
      console.log('Context:', ctx);
      
      // Animation variables
      let animationId = null;
      let currentIconIndex = 0;
      let progress = 0;
      let direction = 1; // 1 for forward, -1 for backward
      
      // Store the curved paths for each connection
      const curvedPaths = [];
      
      // Set canvas size to match its display size
      function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        generateCurvedPaths(); // Regenerate paths on resize
      }
      
      // Initial resize
      resizeCanvas();
      
      // Redraw on window resize
      window.addEventListener('resize', function() {
        resizeCanvas();
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        startAnimation();
      });
      
      // Get positions of elements
      function getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        const containerRect = canvas.parentElement.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        };
      }
      
      // Generate curved paths for each connection
      function generateCurvedPaths() {
        // Clear existing paths
        curvedPaths.length = 0;
        
        // Get positions
        const centralIcon = document.getElementById('central-icon');
        const skillIcons = document.querySelectorAll('.skill-icon');
        
        if (!centralIcon || skillIcons.length === 0) return;
        
        const centralPos = getElementPosition(centralIcon);
        
        // Generate curved path for each skill icon
        skillIcons.forEach((icon, index) => {
          const iconPos = getElementPosition(icon);
          
          // Create control points for bezier curve
          const controlPoint1 = {
            x: centralPos.x + (iconPos.x - centralPos.x) * 0.3,
            y: centralPos.y + (iconPos.y - centralPos.y) * 0.3 - 30
          };
          
          const controlPoint2 = {
            x: centralPos.x + (iconPos.x - centralPos.x) * 0.7,
            y: centralPos.y + (iconPos.y - centralPos.y) * 0.7 - 30
          };
          
          // Store the path
          curvedPaths[index] = {
            start: centralPos,
            cp1: controlPoint1,
            cp2: controlPoint2,
            end: iconPos
          };
        });
      }
      
      // Draw static lines
      function drawStaticLines() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get positions
        const centralIcon = document.getElementById('central-icon');
        const skillIcons = document.querySelectorAll('.skill-icon');
        
        if (!centralIcon || skillIcons.length === 0) return;
        
        const centralPos = getElementPosition(centralIcon);
        
        // Draw static curved lines to each skill icon (fainter)
        skillIcons.forEach((icon, index) => {
          const iconPos = getElementPosition(icon);
          
          // Draw faint curved static line
          ctx.beginPath();
          ctx.moveTo(centralPos.x, centralPos.y);
          
          // Create control points for bezier curve
          const controlPoint1 = {
            x: centralPos.x + (iconPos.x - centralPos.x) * 0.3,
            y: centralPos.y + (iconPos.y - centralPos.y) * 0.3 - 30
          };
          
          const controlPoint2 = {
            x: centralPos.x + (iconPos.x - centralPos.x) * 0.7,
            y: centralPos.y + (iconPos.y - centralPos.y) * 0.7 - 30
          };
          
          ctx.bezierCurveTo(
            controlPoint1.x, controlPoint1.y,
            controlPoint2.x, controlPoint2.y,
            iconPos.x, iconPos.y
          );
          
          // Style
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#38bdf8';
          ctx.lineCap = 'round';
          
          ctx.stroke();
        });
      }
      
      // Draw animated line along curved path
      function drawAnimatedLine() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw static lines first
        drawStaticLines();
        
        // Get positions
        const centralIcon = document.getElementById('central-icon');
        const skillIcons = document.querySelectorAll('.skill-icon');
        
        if (!centralIcon || skillIcons.length === 0 || curvedPaths.length === 0) return;
        
        // Make sure we have a valid icon index
        if (currentIconIndex >= skillIcons.length) {
          currentIconIndex = 0;
        }
        
        const path = curvedPaths[currentIconIndex];
        if (!path) return;
        
        // Calculate point along the curved path
        const point = getPointOnBezierCurve(path, progress);
        
        // Draw the animated line up to the current point
        ctx.beginPath();
        ctx.moveTo(path.start.x, path.start.y);
        
        // Draw partial curve
        if (direction === 1) {
          // Forward direction - draw from start to current point
          drawPartialBezierCurve(ctx, path, 0, progress);
        } else {
          // Backward direction - draw from current point to end
          drawPartialBezierCurve(ctx, path, progress, 1);
        }
        
        // Style
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#38bdf8';
        ctx.lineCap = 'round';
        
        ctx.stroke();
        
        // Draw glow point at the head of the line
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowBlur = 20;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      }
      
      // Helper function to get point on bezier curve
      function getPointOnBezierCurve(path, t) {
        const { start, cp1, cp2, end } = path;
        
        // Clamp t between 0 and 1 to ensure it stays on the path
        t = Math.max(0, Math.min(1, t));
        
        const x = Math.pow(1 - t, 3) * start.x +
                  3 * Math.pow(1 - t, 2) * t * cp1.x +
                  3 * (1 - t) * Math.pow(t, 2) * cp2.x +
                  Math.pow(t, 3) * end.x;
        
        const y = Math.pow(1 - t, 3) * start.y +
                  3 * Math.pow(1 - t, 2) * t * cp1.y +
                  3 * (1 - t) * Math.pow(t, 2) * cp2.y +
                  Math.pow(t, 3) * end.y;
        
        return { x, y };
      }      
      // Helper function to draw partial bezier curve
      function drawPartialBezierCurve(ctx, path, startT, endT) {
        const { start, cp1, cp2, end } = path;
        
        // For simplicity, we'll approximate by drawing many small line segments
        const steps = 50;
        
        // Only draw if we have a valid range
        if (startT > endT) return;
        
        // Clamp values between 0 and 1
        startT = Math.max(0, Math.min(1, startT));
        endT = Math.max(0, Math.min(1, endT));
        
        let firstPoint = true;
        for (let i = 0; i <= steps; i++) {
          const t = startT + (endT - startT) * (i / steps);
          const point = getPointOnBezierCurve(path, t);
          
          if (firstPoint) {
            ctx.moveTo(point.x, point.y);
            firstPoint = false;
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
      }      
      // Animation loop
      function animate() {
        // Update progress
        progress += direction * 0.01;
        
        // Check if we need to change direction or move to next icon
        if (progress >= 1 && direction === 1) {
          // Reached the icon, pause briefly then reverse direction
          setTimeout(() => {
            direction = -1;
          }, 200);
        } else if (progress <= 0 && direction === -1) {
          // Returned to center, move to next icon
          currentIconIndex = (currentIconIndex + 1) % document.querySelectorAll('.skill-icon').length;
          direction = 1;
          progress = 0;
        }        
        drawAnimatedLine();
        animationId = requestAnimationFrame(animate);
      }
      
      // Start animation
      function startAnimation() {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        generateCurvedPaths(); // Generate paths before starting
        animate();
      }
      
      // Initial draw
      setTimeout(() => {
        drawStaticLines();
        startAnimation();
      }, 100);
      
      console.log('Soft skills animation initialized');
      
      // Redraw when elements might have moved
      const observer = new MutationObserver(function() {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        setTimeout(() => {
          drawStaticLines();
          startAnimation();
        }, 100);
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });



//////////////////---------SKILL--------------->//////////////////////

