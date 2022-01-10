docker run  --name shaka-media-server \
            -v /home/ubuntu/media-handling:/home/ubuntu/media-handling:ro \
            -d -p 5500:5500 shaka-media-server \