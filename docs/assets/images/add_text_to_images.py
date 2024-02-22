# Importing the PIL library
from PIL import Image
from PIL import ImageDraw
 
# Open an Image
img = Image.open('docs/assets/images/cvss1.png')
 
# Call draw Method to add 2D graphics in an image
I1 = ImageDraw.Draw(img)
 
# Add Text to an image
I1.text((28, 36), "riskbasedprioritization.com", fill=(255, 0, 0))
 
# Display edited image
img.show()
 
# Save the edited image
img.save("whatever.png")