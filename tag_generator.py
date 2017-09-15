#!/usr/bin/env python

'''
tag_generator.py
Copyright 2017 Long Qian
Contact: lqian8@jhu.edu
This script creates tags for your Jekyll blog hosted by Github page.
No plugins required.
'''

import glob
import os
tag_dir 	= 'tag/'
post_dir 	= '_posts/'
filenames 	= glob.glob(post_dir + '*md')
post_dir 	= 'pages/'

filenames = filenames + [os.path.join(root, name)
             for root, dirs, files in os.walk(tag_dir)
             for name in files
             if name.endswith(('md'))]


total_tags = []
for filename in filenames:
    f = open(filename, 'r')
    crawl = False
    for line in f:
        if crawl:
            current_tags = line.strip().split()
            if current_tags[0] == 'tags:':
                total_tags.extend(current_tags[1:])
                crawl = False
                break
        if line.strip() == '---':
            if not crawl:
                crawl = True
            else:
                crawl = False
                break
    f.close()


total_tags = set(total_tags)

old_tags = glob.glob(tag_dir + '*.md')
for tag in old_tags:
    os.remove(tag)

for tag in total_tags:
    tag_filename = tag_dir + tag + '.md'
    f = open(tag_filename, 'a')
    write_str = '---\nlayout: tagpage\ntitle: \"Tag: ' + tag + '\"\ntag: ' + tag + '\nrobots: noindex\n---\n'
    f.write(write_str)
    f.close()
print("Tags generated, count", total_tags.__len__())








category_dir = 'category/'

filenames = glob.glob(category_dir + '*md')


total_categories = []
for filename in filenames:
    f = open(filename, 'r')
    crawl = False
    for line in f:
        if crawl:
            current_categories = line.strip().split()
            if current_categories[0] == 'categories:':
                total_categories.extend(current_categories[1:])
                crawl = False
                break
        if line.strip() == '---':
            if not crawl:
                crawl = True
            else:
                crawl = False
                break
    f.close()
total_categories = set(total_categories)

old_categories = glob.glob(category_dir + '*.md')
for category in old_categories:
    os.remove(category)

for category in total_categories:
    category_filename = category_dir + category + '.md'
    f = open(category_filename, 'a')
    write_str = '---\nlayout: categorypage\ntitle: \"Category: ' + category + '\"\ncategories: ' + category + '\nrobots: noindex\n---\n'
    f.write(write_str)
    f.close()
print("Tags generated, count", total_categories.__len__())
