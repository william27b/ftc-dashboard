from PIL import Image
import numpy as np

root = './client/src/components/views/IntegrationView/assets/'
image = Image.open(root + 'strafer.png')
# image.show()

image = np.array(image)
alpha = np.ones((2000, 2000, 1)) * 0

alpha = np.ones((2000, 2000, 1)) * 255
make_transparent = np.zeros((2000, 2000, 4))
# image = np.concatenate((image, alpha), axis=2)
maximum_white = 250

transparent = np.argmax(image >= maximum_white, axis=2).astype(bool)
transparent = transparent.reshape((2000, 2000, 1))
transparent = np.tile(transparent, (1, 1, 4))

image = transparent * image

image = np.array(image, dtype=np.uint8)
image = Image.fromarray(image)

image.save(root + 'straferUpdated.png')