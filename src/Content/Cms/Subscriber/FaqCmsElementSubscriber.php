<?php

namespace Faq\Content\Cms\Subscriber;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Storefront\Page\Cms\CmsPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Framework\Struct\ArrayEntity;

class FaqCmsElementSubscriber implements EventSubscriberInterface
{
    private EntityRepository $manufacturerRepository;

    public function __construct(EntityRepository $manufacturerRepository)
    {
        $this->manufacturerRepository = $manufacturerRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CmsPageLoadedEvent::class => 'onCmsPageLoaded'
        ];
    }

    public function onCmsPageLoaded(CmsPageLoadedEvent $event): void
    {
        $context = $event->getContext();
        $manufacturers = $this->manufacturerRepository->search(new Criteria(), $context);

        foreach ($event->getPage()->getSections() as $section) {
            foreach ($section->getBlocks() as $block) {
                foreach ($block->getSlots() as $slot) {
                    if ($slot->getType() !== 'faq-listing') {
                        continue;
                    }

                    $slot->setData(new ArrayEntity([
                        'manufacturers' => $manufacturers->getElements(),
                    ]));
                }
            }
        }
    }
}